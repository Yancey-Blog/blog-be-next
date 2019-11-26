import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { UsersModule } from '../users/users.module'
import { jwtConstants } from './constants'
import { JwtStrategy } from './jwt.strategy'
import { EXPIRES_TIME } from '../shared/constants'

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: EXPIRES_TIME },
    }),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
