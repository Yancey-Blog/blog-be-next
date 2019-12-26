import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LiveToursSchema } from './schemas/live-tours.schema'
import { LiveToursService } from './live-tours.service'
import { LiveToursResolver } from './live-tours.resolver'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'LiveTour', schema: LiveToursSchema }])],
  providers: [LiveToursResolver, LiveToursService],
})
export class LiveToursModule {}
