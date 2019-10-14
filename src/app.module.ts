import { Module, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
// import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './users/users.module'
import { HttpExceptionFilter } from './filters/http-exception.filter'

@Module({
  // imports: [
  //   GraphQLModule.forRoot({
  //     debug: true,
  //     playground: true,
  //   }),
  //   UsersModule,
  // ],
  imports: [UsersModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
