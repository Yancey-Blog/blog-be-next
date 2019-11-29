import { Global, Module } from '@nestjs/common'
import { ConfigService } from './config.service'

// 对于全局模块，其他模块不用导入 ConfigModule，就可以使用 ConfigService
@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`env/${process.env.NODE_ENV || 'development'}.env`),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
