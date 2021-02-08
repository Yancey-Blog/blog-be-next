import { Injectable, HttpService } from '@nestjs/common'
import { ForbiddenError, AuthenticationError } from 'apollo-server-express'
import fetch from 'node-fetch'
import qs from 'query-string'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AxiosResponse } from 'axios'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { UAParser } from 'ua-parser-js'
import requestIP from 'request-ip'
import speakeasy from 'speakeasy'
import { IPModel } from './models/ip-model'
import { GoogleRecaptchaRes } from './interfaces/recaptcha.interface'
import { ConfigService } from '../config/config.service'
import { UsersService } from '../users/users.service'
import { Roles, User } from '../users/interfaces/user.interface'
import { LoginInput } from './dtos/login.input'
import { RegisterInput } from './dtos/register.input'
import { ValidateTOTPInput } from './dtos/validate-totp.input'
import { ChangePasswordInput } from './dtos/change-password.input'
import { TOTP_ENCODE, IP_STACK_URL, GOOGLE_RECAPTCHA_URL } from '../shared/constants'
import { generateQRCode, generateRecoveryCodes, decodeJWT, encryptPassword } from '../shared/utils'

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.usersService = usersService
    this.jwtService = jwtService
    this.httpService = httpService
    this.configService = configService
  }

  private generateJWT(email: string, res: User) {
    const { password, totpSecret, recoveryCodes, ...rest } = res
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

  public async verifyGoogleRecaptchaToken(token: string): Promise<GoogleRecaptchaRes> {
    const params = {
      response: token,
      secret: this.configService.getGoogleRecaptchaKey(),
    }
    const res = await fetch(`${GOOGLE_RECAPTCHA_URL}?${qs.stringify(params)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    const json = await res.json()

    return json
  }

  public async login(loginInput: LoginInput) {
    const { email, password, token } = loginInput
    const { success, 'error-codes': errorCodes } = await this.verifyGoogleRecaptchaToken(token)

    if (success) {
      const res = await this.validateUser(email, password)
      return this.generateJWT(email, res)
    }

    throw new AuthenticationError(
      errorCodes
        ? errorCodes.toString()
        : 'Google Recaptcha verification failed. Please try again!',
    )
  }

  public async register(registerInput: RegisterInput) {
    const { email, username } = registerInput
    const curUserByEmail = await this.usersService.findOneByEmail(email)
    const curUserByUserName = await this.usersService.findOneByUserName(username)

    if (curUserByEmail) {
      throw new ForbiddenError('Email has already been used, Please enter another one.')
    } else if (curUserByUserName) {
      throw new ForbiddenError('UserName has already been used, Please enter another one.')
    } else {
      const count = await this.usersService.getUserCount()
      const params = count === 0 ? { ...registerInput, role: Roles.SUPERUSER } : registerInput
      const res = await this.usersService.create({ ...params })

      return this.generateJWT(email, res)
    }
  }

  public async createTOTP(token: string) {
    const { email } = decodeJWT(token)
    const { base32, otpauth_url } = speakeasy.generateSecret({
      name: email,
    })

    const qrcode = await generateQRCode(`${otpauth_url}&issuer=Yancey%20Inc.`)
    return { qrcode, key: base32 }
  }

  public async validateTOTP(input: ValidateTOTPInput, token: string) {
    const { sub: userId } = decodeJWT(token)
    const { key, code } = input

    const verified = speakeasy.totp.verify({
      secret: key,
      encoding: TOTP_ENCODE,
      token: code,
    })

    if (verified) {
      const res = await this.usersService.updateUser({ id: userId, isTOTP: true, totpSecret: key })
      return this.generateJWT(res.email, res)
    }

    throw new ForbiddenError('Two factor authentication failed!')
  }

  public async createRecoveryCodes(token: string) {
    const { sub: userId } = decodeJWT(token)

    const codes = generateRecoveryCodes()
    const res = await this.usersService.updateUser({ id: userId, recoveryCodes: codes })

    return res
  }

  public async validateRecoveryCode(input: ValidateTOTPInput, token: string) {
    const { sub: userId } = decodeJWT(token)

    const { code } = input
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

  public async changePassword(input: ChangePasswordInput, token: string) {
    const { oldPassword, newPassword } = input
    const { sub: userId } = decodeJWT(token)
    const user = await this.usersService.findOneById(userId)

    if (user && user.isValidPassword(oldPassword, user.password)) {
      const res = await this.usersService.updateUser({
        id: userId,
        password: encryptPassword(newPassword),
      })
      return res
    }

    throw new ForbiddenError('Change password error!')
  }

  public async loginStatistics(req: Request) {
    const IP_STACK_ACCESS_KEY = this.configService.getIpStackAccessKey()
    const token = req.headers.authorization
    const userAgent = req.headers['user-agent']
    const { sub: userId } = decodeJWT(token)
    const ip = requestIP.getClientIp(req)

    const network = {
      ip: ip.includes('::ffff:') ? ip.slice(7) : ip,
      userAgent,
    }

    const uaParser = new UAParser(userAgent)

    const ipInfo = await this.httpService
      .get<IPModel>(`${IP_STACK_URL}${network.ip}`, {
        params: {
          access_key: IP_STACK_ACCESS_KEY,
        },
      })
      .pipe(map((response) => response.data))
      .toPromise()

    const loginInfo = {
      ...ipInfo,
      browser: uaParser.getBrowser(),
      os: uaParser.getOS(),
      loginTime: new Date().toISOString(),
    }

    const user = await this.usersService.findOneById(userId)
    await this.usersService.updateUser({
      id: userId,
      loginStatistics: [...user.loginStatistics, loginInfo],
    })

    return loginInfo
  }
}
