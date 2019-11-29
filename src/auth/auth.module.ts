import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { UsersModule } from '../../users/users.module'
import { JwtStrategy } from './jwt.strategy'
import { ConfigService } from '../config/config.service'
import { EXPIRES_TIME } from '../shared/constants'

const PassPortModule = PassportModule.register({
  defaultStrategy: 'jwt',
})

@Module({
  imports: [
    PassPortModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getJWTSecretKey(),
        signOptions: { expiresIn: EXPIRES_TIME },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, PassPortModule],
})
export class AuthModule {}
