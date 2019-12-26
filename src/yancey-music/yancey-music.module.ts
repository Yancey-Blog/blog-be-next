import { Module } from '@nestjs/common'
import { YanceyMusicController } from './yancey-music.controller'
import { YanceyMusicService } from './yancey-music.service'

@Module({
  controllers: [YanceyMusicController],
  providers: [YanceyMusicService],
})
export class YanceyMusicModule {}
