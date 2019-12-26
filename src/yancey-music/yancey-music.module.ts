import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { YanceyMusicSchema } from './schemas/yancey-music.schema'
import { YanceyMusicResolver } from './yancey-music.resolver'
import { YanceyMusicService } from './yancey-music.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'YanceyMusic', schema: YanceyMusicSchema }])],
  providers: [YanceyMusicResolver, YanceyMusicService],
})
export class YanceyMusicModule {}
