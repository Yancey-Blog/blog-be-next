import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_PIPE, APP_GUARD } from '@nestjs/core'
import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './users/users.module'
import { AnnouncementsModule } from './announcements/announcements.module'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { RolesGuard } from './guard/roles.guard'

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    UsersModule,
    AnnouncementsModule,
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
