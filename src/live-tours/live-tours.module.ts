import { Module } from '@nestjs/common'
import { LiveToursService } from './live-tours.service'
import { LiveToursController } from './live-tours.resolver'

@Module({
  providers: [LiveToursService],
  controllers: [LiveToursController],
})
export class LiveToursModule {}
