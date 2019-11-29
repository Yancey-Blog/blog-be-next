import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersService } from './users.service'
import { UserSchema } from './users.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService],
  // 每个导入 UsersModule 的模块都可以访问 UsersService ，并且它们将共享相同的 UsersService 实例。
  exports: [UsersService],
})
export class UsersModule {}
