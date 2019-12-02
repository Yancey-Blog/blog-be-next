import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { OpenSourcesService } from './open-sources.service'
import { OpenSourceModel } from './models/open-sources.models'
import { CreateOpenSourceInput } from './dtos/create-open-source.input'
import { UpdateOpenSourceInput } from './dtos/update-open-source.input'
import { BatchDelete } from '../database/interfaces/batchDelete.interface'

@Resolver(() => OpenSourceModel)
export class OpenSourcesResolver {
  constructor(private readonly openSourcesService: OpenSourcesService) {
    this.openSourcesService = openSourcesService
  }

  @Query(() => [OpenSourceModel])
  public async getOpenSources(): Promise<OpenSourceModel[]> {
    return this.openSourcesService.findAll()
  }

  @Query(() => OpenSourceModel)
  public async getOpenSourceById(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<OpenSourceModel> {
    return this.openSourcesService.findOneById(id)
  }

  @Mutation(() => OpenSourceModel)
  public async createOpenSource(
    @Args('input') input: CreateOpenSourceInput,
  ): Promise<OpenSourceModel> {
    return this.openSourcesService.create(input)
  }

  @Mutation(() => OpenSourceModel)
  public async updateOpenSourceById(
    @Args('input') input: UpdateOpenSourceInput,
  ): Promise<OpenSourceModel> {
    return this.openSourcesService.update(input)
  }

  @Mutation(() => OpenSourceModel)
  public async deleteOpenSourceById(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<OpenSourceModel> {
    return this.openSourcesService.deleteOneById(id)
  }

  @Mutation(() => OpenSourceModel)
  public async deleteOpenSources(
    @Args({ name: 'ids', type: () => [ID] }) ids: string[],
  ): Promise<BatchDelete> {
    return this.openSourcesService.batchDelete(ids)
  }
}
