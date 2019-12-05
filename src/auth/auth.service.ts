import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { Roles } from '../users/interfaces/user.interface'
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

  public async login(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto
    const res = await this.validateUser(email, password)

    if (res) {
      const payload = { email, sub: res._id }
      return { ...res, authorization: this.jwtService.sign(payload) }
    }
    throw new UnauthorizedException()
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
