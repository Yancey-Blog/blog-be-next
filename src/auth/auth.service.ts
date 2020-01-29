import { Injectable } from '@nestjs/common'
import { ForbiddenError, AuthenticationError } from 'apollo-server-express'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { Roles } from '../users/interfaces/user.interface'
import { LoginInput } from './dtos/login.input'
import { RegisterInput } from './dtos/register.input'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.usersService = usersService
    this.jwtService = jwtService
  }

  public async login(loginInput: LoginInput) {
    const { email, password } = loginInput
    const res = await this.validateUser(email, password)

    if (res) {
      const payload = { email, sub: res._id }
      return { ...res, authorization: this.jwtService.sign(payload) }
    }
    throw new AuthenticationError('email or password error!')
  }

  public async register(registerInput: RegisterInput) {
    const { email, username } = registerInput

    const curEmail = await this.usersService.findOneByEmail(email)

    const curUser = await this.usersService.findOneByUserName(username)

    if (curUser || curEmail) {
      throw new ForbiddenError('username is already taken!')
    } else {
      const count = await this.usersService.getUserCount()
      const params = count === 0 ? { ...registerInput, role: Roles.SUPERUSER } : registerInput
      this.usersService.create(params)
    }
  }

  private async validateUser(email: string, password?: string) {
    const user = await this.usersService.findOneByEmail(email)
    if (user && user.isValidPassword(password, user.password)) {
      // eslint-disable-next-line
      const { password, ...rest } = user.toObject()
      return rest
    }
    return null
  }
}
