import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MottosResolver } from './mottos.resolver'
import { MottosService } from './mottos.service'
import { MottoSchema } from './schemas/mottos.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Motto', schema: MottoSchema }]),
  ],
  controllers: [MottosResolver],
  providers: [MottosService],
})
export class MottosModule {}
