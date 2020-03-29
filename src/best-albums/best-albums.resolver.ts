import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql'
import { BestAlbumsService } from './best-albums.service'
import { BestAlbumModel } from './models/best-albums.model'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { CreateBestAlbumInput } from './dtos/create-best-album.input'
import { UpdateBestAlbumInput } from './dtos/update-best-album.input'
import { GqlAuthGuard } from '../shared/guard/gqlAuth.guard'

@Resolver(() => BestAlbumModel)
export class BestAlbumsResolver {
  constructor(private readonly bestAlbumsService: BestAlbumsService) {
    this.bestAlbumsService = bestAlbumsService
  }

  @Query(() => [BestAlbumModel])
  public async getBestAlbums() {
    return this.bestAlbumsService.findAll()
  }

  @Query(() => BestAlbumModel)
  public async getBestAlbumById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.bestAlbumsService.findOneById(id)
  }

  @Mutation(() => BestAlbumModel)
  @UseGuards(GqlAuthGuard)
  public async createBestAlbum(@Args('input') input: CreateBestAlbumInput) {
    return this.bestAlbumsService.create(input)
  }

  @Mutation(() => BestAlbumModel)
  @UseGuards(GqlAuthGuard)
  public async updateBestAlbumById(@Args('input') input: UpdateBestAlbumInput) {
    return this.bestAlbumsService.update(input)
  }

  @Mutation(() => BestAlbumModel)
  @UseGuards(GqlAuthGuard)
  public async deleteBestAlbumById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.bestAlbumsService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  @UseGuards(GqlAuthGuard)
  public async deleteBestAlbums(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.bestAlbumsService.batchDelete(ids)
  }
}
