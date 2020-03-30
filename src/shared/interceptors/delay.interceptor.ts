import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { sleep } from 'yancey-js-util'
import { ConfigService } from '../../config/config.service'

@Injectable()
export class DelayInterceptor implements NestInterceptor {
  private needSimulateNetworkThrottle: boolean

  private isEnvDevelopment: boolean

  constructor(private readonly configService: ConfigService) {
    this.needSimulateNetworkThrottle = configService.needSimulateNetworkThrottle()
    this.isEnvDevelopment = configService.isEnvDevelopment
  }

  public async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    if (this.isEnvDevelopment && this.needSimulateNetworkThrottle) {
      await sleep()
    }

    return next.handle()
  }
}
