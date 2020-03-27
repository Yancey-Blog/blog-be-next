import { Injectable } from '@nestjs/common'
import { ForbiddenError, AuthenticationError } from 'apollo-server-express'
import { JwtService } from '@nestjs/jwt'
import speakeasy from 'speakeasy'
import { generateQRCode } from '../shared/utils'
import { UsersService } from '../users/users.service'
import { Roles, User } from '../users/interfaces/user.interface'
import { LoginInput } from './dtos/login.input'
import { RegisterInput } from './dtos/register.input'
import { ValidateTOTPInput } from './dtos/validate-totp.input'

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
    const { password, twoFactorSecret, ...rest } = res.toObject() as User
    const payload = { email, sub: res._id }
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

  public async createTOTP(userId: string) {
    const { base32, otpauth_url } = speakeasy.generateSecret({ name: 'Yancey Blog CMS' })

    await this.usersService.updateUser({
      id: userId,
      twoFactorSecret: base32,
    })

    return generateQRCode(otpauth_url)
  }

  public async validateTOTP(input: ValidateTOTPInput) {
    const { userId, token } = input

    const { twoFactorSecret } = await this.usersService.findOneById(userId)

    const verified = speakeasy.totp.verify({
      secret: twoFactorSecret,
      encoding: 'base32',
      token,
    })

    if (verified) {
      const res = await this.usersService.updateUser({ id: userId, isTOTP: true })
      return this.generateJWT(res.email, res)
    }

    throw new AuthenticationError('Two factor authentication failed!')
  }
}
