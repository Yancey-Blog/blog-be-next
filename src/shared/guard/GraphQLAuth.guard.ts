import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthenticationError } from 'apollo-server-express'
import { ConfigService } from '../../config/config.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  private isEnvTest: boolean

  constructor(configService: ConfigService) {
    super()
    this.isEnvTest = configService.isEnvTest
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // 测试环境下跳过 token 校验
    if (this.isEnvTest) {
      return true
    }

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
