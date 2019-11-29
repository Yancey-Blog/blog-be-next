import { Controller, Body, Post, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../../users/dtos/createUser.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  public async login(@Body() body) {
    return this.authService.login(body)
  }

  @Post('/register')
  // @UsePipes(new ValidationPipe())
  public register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }
}
