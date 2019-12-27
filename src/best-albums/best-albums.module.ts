import { Module } from '@nestjs/common'
import { BestAlbumsController } from './best-albums.controller'
import { BestAlbumsService } from './best-albums.service'

@Module({
  controllers: [BestAlbumsController],
  providers: [BestAlbumsService],
})
export class BestAlbumsModule {}
