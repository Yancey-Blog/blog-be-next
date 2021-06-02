import { Module } from '@nestjs/common'
import { SentryModule } from '@ntegral/nestjs-sentry'
import { LogLevel } from '@sentry/types'
import { ConfigService } from '../config/config.service'

@Module({
  imports: [
    SentryModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        dsn: configService.getSentryDSN(),
        debug: !configService.isEnvProduction,
        environment: configService.getNodeEnv(),
        logLevel: LogLevel.Debug,
        tracesSampleRate: 1.0,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class SentryMonitorModule {}
