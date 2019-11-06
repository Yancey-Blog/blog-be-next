import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_PIPE, APP_GUARD } from '@nestjs/core'

import { HttpExceptionFilter } from './filters/http-exception.filter'
import { RolesGuard } from './guard/roles.guard'

import { ConfigModule } from './config/config.module'
import { DataBaseModule } from './database/database.module'
// import { GraphqlModule } from './graphql/graphqls.module'

import { UploadersModule } from './modules/uploaders/uploaders.module'
import { UsersModule } from './modules/users/users.module'
// import { AnnouncementsModule } from './modules/announcements/announcements.module'
import { MottosModule } from './modules/mottos/mottos.module'

@Module({
  imports: [
    ConfigModule,
    // GraphqlModule,
    DataBaseModule,

    UploadersModule,
    UsersModule,
    // AnnouncementsModule,
    MottosModule,
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
