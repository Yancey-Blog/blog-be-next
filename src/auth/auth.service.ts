import { Injectable } from '@nestjs/common'
import { ForbiddenError, AuthenticationError } from 'apollo-server-express'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { Roles, User } from '../users/interfaces/user.interface'
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

    return this.generateJWT(email, res)
  }

  public async register(registerInput: RegisterInput) {
    const { email, username } = registerInput

    const curEmail = await this.usersService.findOneByEmail(email)

    const curUser = await this.usersService.findOneByUserName(username)

    if (curUser || curEmail) {
      throw new ForbiddenError('Email is already registered!')
    } else {
      const count = await this.usersService.getUserCount()
      const params = count === 0 ? { ...registerInput, role: Roles.SUPERUSER } : registerInput
      const res = await this.usersService.create(params)

      return this.generateJWT(email, res)
    }
  }

  private generateJWT(email: string, res: User) {
    const { password, ...rest } = res.toObject()
    const payload = { email, sub: res._id }
    return { authorization: this.jwtService.sign(payload), ...rest }
  }

  private async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email)

    if (user && user.isValidPassword(password, user.password)) {
      return user
    }

    throw new AuthenticationError('Email and password are not matching!')
  }
}
