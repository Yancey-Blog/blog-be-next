import { Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'

const { format } = winston

@Module({
  imports: [
    WinstonModule.forRoot({
      exitOnError: false,
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'HH:mm:ss YY/MM/DD',
        }),
        format.label({
          label: 'winston logger ',
        }),
        format.splat(),
        format.printf((info) => `${info.timestamp} ${info.level}: [${info.label}] ${info.message}`),
      ),
      transports: [new winston.transports.Console()],
    }),
  ],
})
export class WinstonLogModule {}
