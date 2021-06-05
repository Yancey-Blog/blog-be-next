import { Module } from '@nestjs/common'
import { WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

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
          label: 'winston logger',
        }),

        format.splat(),
        format.printf((info) => `${info.timestamp} ${info.level}: [${info.label}]${info.message}`),
      ),
      transports: [
        new winston.transports.Console({
          level: 'info',
        }),
        new DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    }),
  ],
})
export class WinstonLogModule {}
