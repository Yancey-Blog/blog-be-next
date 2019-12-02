import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { OpenSourceSchema } from './schemas/open-sources.schema'
import { OpenSourcesResolver } from './open-sources.resolver'
import { OpenSourcesService } from './open-sources.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'OpenSource', schema: OpenSourceSchema }])],
  providers: [OpenSourcesResolver, OpenSourcesService],
})
export class OpenSourcesModule {}
