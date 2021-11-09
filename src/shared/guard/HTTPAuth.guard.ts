import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  public async canActivate(context: ExecutionContext) {
    try {
      return (await super.canActivate(context)) as boolean
    } catch (e) {
      throw new UnauthorizedException('The session has expired, please login again.')
    }
  }
}
