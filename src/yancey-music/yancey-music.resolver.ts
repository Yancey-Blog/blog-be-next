import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { YanceyMusicService } from './yancey-music.service'
import { YanceyMusicModel } from './models/yancey-music.model'
import { BatchDeleteModel } from '../database/models/database.model'
import { CreateYanceyMusicInput } from './dtos/create-yancey-music.input'
import { UpdateYanceyMusicInput } from './dtos/update-yancey-music.input'

@Resolver(() => YanceyMusicModel)
export class YanceyMusicResolver {
  constructor(private readonly yanceyMusicsService: YanceyMusicService) {
    this.yanceyMusicsService = yanceyMusicsService
  }

  @Query(() => [YanceyMusicModel])
  public async getYanceyMusic() {
    return this.yanceyMusicsService.findAll()
  }

  @Query(() => YanceyMusicModel)
  public async getYanceyMusicById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.yanceyMusicsService.findOneById(id)
  }

  @Mutation(() => YanceyMusicModel)
  public async createYanceyMusic(@Args('input') input: CreateYanceyMusicInput) {
    return this.yanceyMusicsService.create(input)
  }

  @Mutation(() => YanceyMusicModel)
  public async updateYanceyMusicById(@Args('input') input: UpdateYanceyMusicInput) {
    return this.yanceyMusicsService.update(input)
  }

  @Mutation(() => YanceyMusicModel)
  public async deleteYanceyMusicById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.yanceyMusicsService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  public async deleteYanceyMusic(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.yanceyMusicsService.batchDelete(ids)
  }
}
