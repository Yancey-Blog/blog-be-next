import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { PostStatisticsService } from './post-statistics.service'
import { PostStatisticsModel } from './models/post-statistics.model'
import { PostStatisticsGroupModel } from './models/post-statistics-group.model'
import { CreatePostStatisticsInput } from './dtos/create-post-statistics.input'
import { JwtAuthGuard } from '../shared/guard/GraphQLAuth.guard'

@Resolver()
export class PostStatisticsResolver {
  constructor(private readonly postStatisticsService: PostStatisticsService) {
    this.postStatisticsService = postStatisticsService
  }

  @Query(() => [PostStatisticsGroupModel])
  @UseGuards(JwtAuthGuard)
  public async getPostStatistics(): Promise<PostStatisticsGroupModel[]> {
    return this.postStatisticsService.findAll()
  }

  @Mutation(() => PostStatisticsModel)
  @UseGuards(JwtAuthGuard)
  public async createPostStatistics(
    @Args('input') input: CreatePostStatisticsInput,
  ): Promise<PostStatisticsModel> {
    return this.postStatisticsService.create(input)
  }
}
