import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql'
import { OpenSourcesService } from './open-sources.service'
import { OpenSourceModel } from './models/open-sources.model'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { CreateOpenSourceInput } from './dtos/create-open-source.input'
import { UpdateOpenSourceInput } from './dtos/update-open-source.input'
import { JwtAuthGuard } from '../shared/guard/GraphQLAuth.guard'

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
  @UseGuards(JwtAuthGuard)
  public async createOpenSource(@Args('input') input: CreateOpenSourceInput) {
    return this.openSourcesService.create(input)
  }

  @Mutation(() => OpenSourceModel)
  @UseGuards(JwtAuthGuard)
  public async updateOpenSourceById(@Args('input') input: UpdateOpenSourceInput) {
    return this.openSourcesService.update(input)
  }

  @Mutation(() => OpenSourceModel)
  @UseGuards(JwtAuthGuard)
  public async deleteOpenSourceById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.openSourcesService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  @UseGuards(JwtAuthGuard)
  public async deleteOpenSources(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.openSourcesService.batchDelete(ids)
  }
}
