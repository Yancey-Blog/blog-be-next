import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql'
import { PostsService } from './posts.service'
import { PostModel } from './models/posts.model'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { CreatePostInput } from './dtos/create-post.input'
import { UpdatePostInput } from './dtos/update-post.input'
import { GqlAuthGuard } from '../shared/guard/gqlAuth.guard'

@Resolver(() => PostModel)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {
    this.postsService = postsService
  }

  @Query(() => [PostModel])
  public async getPosts() {
    return this.postsService.findAll()
  }

  @Query(() => PostModel)
  public async getPostById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.postsService.findOneById(id)
  }

  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard)
  public async createPost(@Args('input') input: CreatePostInput) {
    return this.postsService.create(input)
  }

  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard)
  public async updatePostById(@Args('input') input: UpdatePostInput) {
    return this.postsService.update(input)
  }

  @Mutation(() => PostModel)
  @UseGuards(GqlAuthGuard)
  public async deletePostById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.postsService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  @UseGuards(GqlAuthGuard)
  public async deletePosts(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.postsService.batchDelete(ids)
  }
}
