import { Module, HttpModule } from '@nestjs/common'
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
