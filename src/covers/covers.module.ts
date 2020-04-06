import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CoverSchema } from './schemas/covers.schema'
import { CoversResolver } from './covers.resolver'
import { CoversService } from './covers.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cover', schema: CoverSchema }])],
  providers: [CoversResolver, CoversService],
})
export class CoversModule {}
