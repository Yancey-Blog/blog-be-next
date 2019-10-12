import { Module } from '@nestjs/common'
// import { GraphQLModule } from '@nestjs/graphql'
import { UserController } from './users.controller'
import { UserService } from './users.service'

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
