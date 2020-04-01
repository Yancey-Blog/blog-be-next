import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Payload } from './interfaces/jwt.interface'
import { Validate } from './interfaces/validate.interface'
import { ConfigService } from '../config/config.service'

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
    const signup = { userId: payload.sub, email: payload.email }
    return signup
  }
}

// JwtStrategy 用于保护指定接口
