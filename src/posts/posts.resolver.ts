import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation, ID, Int } from '@nestjs/graphql'
import { PostsService } from './posts.service'
import { PostModel, PostItemModel } from './models/posts.model'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { CreatePostInput } from './dtos/create-post.input'
import { UpdatePostInput } from './dtos/update-post.input'
import { PaginationInput } from './dtos/pagination.input'
import { GqlAuthGuard } from '../shared/guard/gqlAuth.guard'

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {
    this.postsService = postsService
  }

  @Query(() => PostModel)
  @UseGuards(GqlAuthGuard)
  public async getPosts(@Args('input') input: PaginationInput) {
    return this.postsService.findAll(input)
  }

  @Query(() => PostItemModel)
  @UseGuards(GqlAuthGuard)
  public async getPostById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.postsService.findOneById(id)
  }

  @Mutation(() => PostItemModel)
  @UseGuards(GqlAuthGuard)
  public async createPost(@Args('input') input: CreatePostInput) {
    return this.postsService.create(input)
  }

  @Mutation(() => PostItemModel)
  @UseGuards(GqlAuthGuard)
  public async updatePostById(@Args('input') input: UpdatePostInput) {
    return this.postsService.update(input)
  }

  @Mutation(() => PostItemModel)
  @UseGuards(GqlAuthGuard)
  public async deletePostById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.postsService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  @UseGuards(GqlAuthGuard)
  public async deletePosts(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.postsService.batchDelete(ids)
  }

  @Mutation(() => PostItemModel)
  public async updatePV(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.postsService.updatePV(id)
  }

  @Mutation(() => PostItemModel)
  public async updateLike(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.postsService.updateLike(id)
  }

  @Query(() => [PostItemModel])
  public async getTopPVPosts(@Args({ name: 'limit', type: () => Int }) limit: number) {
    return this.postsService.getTopPVPosts(limit)
  }
}
