import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
// import { AuthenticationError } from 'apollo-server-express'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') implements CanActivate {
  // FIXME: 在这里做校验？
  // public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
  //   throw new AuthenticationError('Authentication Error!')
  // }

  public getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}
