import { Module } from '@nestjs/common'
import { LiveToursService } from './live-tours.service'
import { LiveToursResolver } from './live-tours.resolver'

@Module({
  providers: [LiveToursResolver, LiveToursService],
})
export class LiveToursModule {}
