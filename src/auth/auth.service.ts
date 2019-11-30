import { Injectable, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { User, Roles } from '../users/interfaces/user.interface'
import { CreateUserDto } from '../users/dtos/createUser.dto'
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.usersService = usersService
    this.jwtService = jwtService
  }

  public async validateUser(email: string, password?: string) {
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

  public async register(createUserDto: CreateUserDto) {
    const curUser = await this.usersService.findOneByEmail(createUserDto.email)

    if (curUser) {
      throw new ConflictException()
    } else {
      const count = await this.usersService.getUserCount()
      const params = count === 0 ? { ...createUserDto, role: Roles.SUPERUSER } : createUserDto
      this.usersService.create(params)
    }
  }
}
