import { Module } from '@nestjs/common'
import { BandwagonService } from './bandwagon.service'
import { BandwagonResolver } from './bandwagon.resolver'

@Module({
  providers: [BandwagonService, BandwagonResolver],
})
export class BandwagonModule {}
