import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { UsersModule } from '../users/users.module'
import { JwtStrategy } from './jwt.strategy'
import { EXPIRES_TIME } from '../shared/constants'

const PassPortModule = PassportModule.register({
  defaultStrategy: 'jwt',
})

@Module({
  imports: [
    PassPortModule,
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // FIXME:
      signOptions: { expiresIn: EXPIRES_TIME },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, PassPortModule],
})
export class AuthModule {}
