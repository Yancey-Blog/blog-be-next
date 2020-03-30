import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { sleep } from 'yancey-js-util'

@Injectable()
export class DelayInterceptor implements NestInterceptor {
  public async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    await sleep()
    return next.handle()
  }
}
