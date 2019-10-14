import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
// import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './users/users.module'
import { HttpExceptionFilter } from './filters/http-exception.filter'

@Module({
  // imports: [
  //   GraphQLModule.forRoot({
  //     debug: true,
  //     playground: true,
  //   }),
  // ],
  imports: [UsersModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
