import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable, of } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  public canActivate(ctx: ExecutionContext): Observable<boolean> {
    const request = ctx.switchToHttp().getRequest()
    console.log(request.headers.authorization)
    // const {
    //   headers: { authorization },
    // } = request
    // return of(!!authorization)
    return of(true)
  }
}
