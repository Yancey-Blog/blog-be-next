import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable, of } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): Observable<boolean> {
    const request = ctx.switchToHttp().getRequest()
    const {
      headers: { authorization },
    } = request
    return of(!!authorization)
  }
}
