import { Module } from '@nestjs/common'
import { BestAlbumsResolver } from './best-albums.resolver'
import { BestAlbumsService } from './best-albums.service'

@Module({
  controllers: [BestAlbumsResolver],
  providers: [BestAlbumsService],
})
export class BestAlbumsModule {}
