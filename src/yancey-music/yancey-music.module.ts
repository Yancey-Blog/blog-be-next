import { Module } from '@nestjs/common'
import { YanceyMusicResolver } from './yancey-music.resolver'
import { YanceyMusicService } from './yancey-music.service'

@Module({
  controllers: [YanceyMusicResolver],
  providers: [YanceyMusicService],
})
export class YanceyMusicModule {}
