import { Module } from '@nestjs/common'
import { WinstonModule, utilities } from 'nest-winston'
import * as winston from 'winston'
import { DateTime } from 'luxon'

const {
  errors,
  combine,
  json,
  timestamp,
  ms,
  prettyPrint,
  colorize,
  label,
  splat,
} = winston.format

@Module({
  imports: [
    WinstonModule.forRoot({
      format: combine(
        colorize(),
        errors(),
        json(),
        timestamp({ format: 'HH:mm:ss YY/MM/DD' }),
        ms(),
        prettyPrint(),
        label({
          label: '[UPLOADER SERVICE] ',
        }),
        splat(),
      ),
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: `error-${DateTime.now().toISODate()}.log`,
          dirname: 'logs',
          maxsize: 5000000,
        }),
        new winston.transports.Console({
          level: 'debug',
          format: combine(utilities.format.nestLike()),
        }),

        new winston.transports.File({
          filename: `application-${DateTime.now().toISODate()}.log`,
          dirname: 'logs',
          maxsize: 5000000,
        }),
      ],
    }),
  ],
})
export class LoggerModule {}
