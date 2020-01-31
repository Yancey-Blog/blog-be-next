import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { OpenSourcesService } from './open-sources.service'
import { OpenSourceModel } from './models/open-sources.model'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { CreateOpenSourceInput } from './dtos/create-open-source.input'
import { UpdateOpenSourceInput } from './dtos/update-open-source.input'
import { GqlAuthGuard } from '../guard/gqlAuth.guard'

@Resolver(() => OpenSourceModel)
export class OpenSourcesResolver {
  constructor(private readonly openSourcesService: OpenSourcesService) {
    this.openSourcesService = openSourcesService
  }

  @Query(() => [OpenSourceModel])
  public async getOpenSources() {
    return this.openSourcesService.findAll()
  }

  @Query(() => OpenSourceModel)
  public async getOpenSourceById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.openSourcesService.findOneById(id)
  }

  @Mutation(() => OpenSourceModel)
  // @UseGuards(GqlAuthGuard)
  public async createOpenSource(@Args('input') input: CreateOpenSourceInput) {
    return this.openSourcesService.create(input)
  }

  @Mutation(() => OpenSourceModel)
  // @UseGuards(GqlAuthGuard)
  public async updateOpenSourceById(@Args('input') input: UpdateOpenSourceInput) {
    return this.openSourcesService.update(input)
  }

  @Mutation(() => OpenSourceModel)
  // @UseGuards(GqlAuthGuard)
  public async deleteOpenSourceById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.openSourcesService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  // @UseGuards(GqlAuthGuard)
  public async deleteOpenSources(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.openSourcesService.batchDelete(ids)
  }
}
