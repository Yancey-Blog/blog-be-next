import {
  Injectable,
  CanActivate,
  ExecutionContext,
  // UnauthorizedException,
} from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    this.reflector = reflector
  }

  public canActivate(context: ExecutionContext): Observable<boolean> {
    console.log(context)

    // const roles = this.reflector.get<string[]>('roles', context.getHandler())

    // const request = context.switchToHttp().getRequest()
    // const {
    //   headers: { authorization },
    // } = request

    // if (roles && roles.includes('admin') && !authorization) {
    //   throw new UnauthorizedException()
    // }

    return of(true)
  }
}
