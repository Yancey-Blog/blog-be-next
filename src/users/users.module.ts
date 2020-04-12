import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserResolver } from './users.resolver'
import { UsersService } from './users.service'
import { UserSchema } from './schemas/users.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
