import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Validate } from './interfaces/validate.interface'
import { ConfigService } from '../config/config.service'

interface Payload {
  sub: string
  email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const JWT_SECRET_KEY = configService.getJWTSecretKey()

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY,
    })
  }

  public async validate(payload: Payload): Promise<Validate> {
    return { userId: payload.sub, email: payload.email }
  }
}

// JwtStrategy 用于保护指定接口
