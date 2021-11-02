import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation, ID, Int } from '@nestjs/graphql'
import { PostsService } from './posts.service'
import { PostModel } from './models/posts.model'
import { PostItemModel } from './models/post.model'
import { ArchiveModel } from './models/archive.model'
import { TagsModel } from './models/tags.model'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { CreatePostInput } from './dtos/create-post.input'
import { UpdatePostInput } from './dtos/update-post.input'
import { PaginationInput } from './dtos/pagination.input'
import { JwtAuthGuard } from '../shared/guard/GraphQLAuth.guard'

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {
    this.postsService = postsService
  }

  @Query(() => PostModel)
  public async posts(@Args('input') input: PaginationInput) {
    return this.postsService.findPublicByPagination(input)
  }

  @Query(() => PostModel)
  @UseGuards(JwtAuthGuard)
  public async getPosts(@Args('input') input: PaginationInput) {
    return this.postsService.findByPagination(input)
  }

  @Query(() => PostItemModel)
  public async getPostById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.postsService.findOneById(id)
  }

  @Mutation(() => PostItemModel)
  @UseGuards(JwtAuthGuard)
  public async createPost(@Args('input') input: CreatePostInput) {
    return this.postsService.create(input)
  }

  @Mutation(() => PostItemModel)
  @UseGuards(JwtAuthGuard)
  public async updatePostById(@Args('input') input: UpdatePostInput) {
    return this.postsService.update(input)
  }

  @Mutation(() => PostItemModel)
  @UseGuards(JwtAuthGuard)
  public async deletePostById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.postsService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  @UseGuards(JwtAuthGuard)
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

  @Query(() => [PostItemModel])
  public async getTopLikePosts(@Args({ name: 'limit', type: () => Int }) limit: number) {
    return this.postsService.getTopLikePosts(limit)
  }

  @Query(() => TagsModel)
  public async getAllTags() {
    return this.postsService.getAllTags()
  }

  @Query(() => [ArchiveModel])
  public async archive() {
    return this.postsService.archive()
  }
}
