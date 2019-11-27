import { Injectable, ConflictException } from '@nestjs/common'
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

  public async validateUser(email: string, password?: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email)
    if (user && user.isValidPassword(password, user.password)) {
      // eslint-disable-next-line
      const { password, ...rest } = user
      return rest
    }
    return null
  }

  public async login(user: User) {
    const payload = { email: user.email, sub: user._id }
    return {
      token: this.jwtService.sign(payload),
    }
  }

  public async register(user: any) {
    const curUser = await this.usersService.findOneByEmail(user.email)
    if (!curUser) {
      return this.usersService.create(user)
    }
    throw new ConflictException()
  }
}
