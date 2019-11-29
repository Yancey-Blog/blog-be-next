import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_PIPE, APP_GUARD } from '@nestjs/core'

import { HttpExceptionFilter } from './filters/http-exception.filter'
import { RolesGuard } from './guard/roles.guard'

import { ConfigModule } from './config/config.module'
import { DataBaseModule } from './database/database.module'
import { GraphqlModule } from './graphql/graphqls.module'
import { AuthModule } from './auth/auth.module'
import { UploadersModule } from './uploaders/uploaders.module'
import { UsersModule } from '../users/users.module'
import { AnnouncementsModule } from './announcements/announcements.module'
import { MottosModule } from './mottos/mottos.module'
import { SMSModule } from './sms/sms.module'

@Module({
  imports: [
    ConfigModule,
    GraphqlModule,
    DataBaseModule,
    AuthModule,
    UploadersModule,
    UsersModule,
    AnnouncementsModule,
    MottosModule,
    SMSModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
