import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { PostStatisticsService } from './post-statistics.service'
import { PostStatisticsModel } from './models/post-statistics.model'
import { PostStatisticsGroupModel } from './models/post-statistics-group.model'
import { CreatePostStatisticsInput } from './dtos/create-post-statistics.input'
import { GqlAuthGuard } from '../shared/guard/gqlAuth.guard'

@Resolver()
export class PostStatisticsResolver {
  constructor(private readonly postStatisticsService: PostStatisticsService) {
    this.postStatisticsService = postStatisticsService
  }

  @Query(() => [PostStatisticsGroupModel])
  @UseGuards(GqlAuthGuard)
  public async getPostStatistics(): Promise<PostStatisticsGroupModel[]> {
    return this.postStatisticsService.findAll()
  }

  @Mutation(() => PostStatisticsModel)
  @UseGuards(GqlAuthGuard)
  public async createPostStatistics(
    @Args('input') input: CreatePostStatisticsInput,
  ): Promise<PostStatisticsModel> {
    return this.postStatisticsService.create(input)
  }
}
