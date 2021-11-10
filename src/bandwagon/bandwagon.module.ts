import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { BandwagonService } from './bandwagon.service'
import { BandwagonResolver } from './bandwagon.resolver'

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [BandwagonService, BandwagonResolver],
})
export class BandwagonModule {}
