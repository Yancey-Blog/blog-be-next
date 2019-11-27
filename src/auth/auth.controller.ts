import { Controller, Body, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'

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
  public register(@Body() body) {
    return this.authService.register(body)
  }
}
