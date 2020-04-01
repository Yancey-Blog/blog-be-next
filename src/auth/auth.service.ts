import { Injectable } from '@nestjs/common'
import { ForbiddenError, AuthenticationError } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import { JwtService } from '@nestjs/jwt'
import speakeasy from 'speakeasy'
import { generateQRCode, generateRecoveryCodes } from '../shared/utils'
import { UsersService } from '../users/users.service'
import { Roles, User } from '../users/interfaces/user.interface'
import { LoginInput } from './dtos/login.input'
import { RegisterInput } from './dtos/register.input'
import { ValidateTOTPInput } from './dtos/validate-totp.input'
import { Payload } from './interfaces/jwt.interface'
import { TOTP_ENCODE } from '../shared/constants'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.usersService = usersService
    this.jwtService = jwtService
  }

  private generateJWT(email: string, res: User) {
    const { password, totpSecret, recoveryCodes, ...rest } = res.toObject() as User
    const payload = { email, sub: res._id, issuer: 'Yancey Inc.' }
    return { authorization: this.jwtService.sign(payload), ...rest }
  }

  private async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email)

    if (user && user.isValidPassword(password, user.password)) {
      return user
    }

    throw new AuthenticationError('Your username and password do not match. Please try again!')
  }

  public async login(loginInput: LoginInput) {
    const { email, password } = loginInput
    const res = await this.validateUser(email, password)

    return this.generateJWT(email, res)
  }

  public async register(registerInput: RegisterInput) {
    const { email, username } = registerInput
    const curEmail = await this.usersService.findOneByEmail(email)
    const curUser = await this.usersService.findOneByUserName(username)

    if (curUser || curEmail) {
      throw new ForbiddenError('Email is already registered!')
    } else {
      // TODO: 通过脚本初始化 root 用户
      const count = await this.usersService.getUserCount()
      const params = count === 0 ? { ...registerInput, role: Roles.SUPERUSER } : registerInput
      const res = await this.usersService.create(params)

      return this.generateJWT(email, res)
    }
  }

  public async createTOTP(token: string) {
    const { email, sub: userId } = jwt.decode(token.slice(7)) as Payload

    const { base32, otpauth_url } = speakeasy.generateSecret({
      name: email,
    })

    const qrcode = await generateQRCode(`${otpauth_url}&issuer=Yancey%20Inc.`)

    return { qrcode, secretKey: base32 }
  }

  public async validateTOTP(input: ValidateTOTPInput) {
    const { userId, key, code } = input

    const res = await this.usersService.findOneById(userId)

    const verified = speakeasy.totp.verify({
      secret: key,
      encoding: TOTP_ENCODE,
      token: code,
    })

    if (verified) {
      if (!res.isTOTP) {
        await this.usersService.updateUser({ id: userId, isTOTP: true, totpSecret: key })
      }

      return this.generateJWT(res.email, res)
    }

    throw new ForbiddenError('Two factor authentication failed!')
  }

  public async createRecoveryCodes(userId: string) {
    const codes = generateRecoveryCodes()
    const res = await this.usersService.updateUser({ id: userId, recoveryCodes: codes })

    return res
  }

  public async validateRecoveryCode(input: ValidateTOTPInput) {
    const { userId, code } = input
    const { recoveryCodes } = await this.usersService.findOneById(userId)
    const index = recoveryCodes.indexOf(code)

    if (index !== -1) {
      recoveryCodes.splice(index, 1)
      const restRecoveryCodes = recoveryCodes
      const res = await this.usersService.updateUser({
        id: userId,
        recoveryCodes: restRecoveryCodes,
      })
      return this.generateJWT(res.email, res)
    }

    throw new ForbiddenError('Two factor authentication failed!')
  }
}
