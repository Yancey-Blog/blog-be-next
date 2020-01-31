import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthenticationError } from 'apollo-server-express'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return (await super.canActivate(context)) as boolean
    } catch (e) {
      throw new AuthenticationError('The session has expired, please login again.')
    }
  }

  public getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}
