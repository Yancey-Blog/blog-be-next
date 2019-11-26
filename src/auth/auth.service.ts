import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { User } from '../users/interfaces/user.interface'
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.usersService = usersService
    this.jwtService = jwtService
  }

  public async validateUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findUserByUserName(username)
    if (user && user.password === pass) {
      // eslint-disable-next-line
      const { password, ...result } = user
      return result
    }
    return null
  }

  public async login(user: User) {
    const payload = { username: user.name, sub: user._id }
    return {
      token: this.jwtService.sign(payload),
    }
  }
}
