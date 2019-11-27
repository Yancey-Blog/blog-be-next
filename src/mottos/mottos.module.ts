import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MottosResolver } from './mottos.resolver'
import { MottosService } from './mottos.service'
import { MottoSchema } from './mottos.schema'
import { AuthModule } from '../auth/auth.module' // 使用默认策略的模块都要导入 AuthModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Motto', schema: MottoSchema }]),
    AuthModule,
  ],
  controllers: [MottosResolver],
  providers: [MottosService],
})
export class MottosModule {}
