import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtStrategy } from './jwt.strategy'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'

const PassPortModule = PassportModule.register({
  defaultStrategy: 'jwt',
})

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000,
        maxRedirects: 5,
      }),
    }),
    ConfigModule,
    PassPortModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getJWTSecretKey(),
        signOptions: { expiresIn: configService.getJWTExpiresTime() },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [AuthService, PassPortModule],
})
export class AuthModule {}
