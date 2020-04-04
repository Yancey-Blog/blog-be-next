import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PostSchema } from './schemas/posts.schema'
import { PostsResolver } from './posts.resolver'
import { PostsService } from './posts.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
