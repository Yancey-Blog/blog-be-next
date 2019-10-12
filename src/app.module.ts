import { Module } from '@nestjs/common'
// import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './users/users.module'

@Module({
  // imports: [
  //   GraphQLModule.forRoot({
  //     debug: true,
  //     playground: true,
  //   }),
  // ],
  imports: [UsersModule],
})
export class AppModule {}
