import { Controller, Body, Post, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginRes } from './interfaces/login.interface'
import { CreateUserDto } from '../users/dtos/createUser.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService
  }

  @Post('/login')
  public async login(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<LoginRes> {
    return this.authService.login(createUserDto)
  }

  @Post('/register')
  public async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<void> {
    return this.authService.register(createUserDto)
  }
}
