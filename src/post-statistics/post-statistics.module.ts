import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PostStatisticsResolver } from './post-statistics.resolver'
import { PostStatisticsService } from './post-statistics.service'
import { PostStatisticsSchema } from './schemas/post-statistics.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'PostStatistics', schema: PostStatisticsSchema }])],
  providers: [PostStatisticsService, PostStatisticsResolver],
})
export class PostStatisticsModule {}
