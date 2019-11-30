import { Controller, Body, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { LoginRes } from './interfaces/login.interface'
import { CreateUserDto } from '../users/dtos/createUser.dto'
import { User } from '../users/interfaces/user.interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  public async login(@Body(new ValidationPipe()) user: User): Promise<LoginRes> {
    return this.authService.login(user)
  }

  @Post('/register')
  public async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<void> {
    return this.authService.register(createUserDto)
  }
}
