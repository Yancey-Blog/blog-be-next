import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql'
import { LiveToursService } from './live-tours.service'
import { LiveTourModel } from './models/live-tours.model'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { CreateLiveTourInput } from './dtos/create-live-tour.input'
import { UpdateLiveTourInput } from './dtos/update-live-tour.input'
import { JwtAuthGuard } from '../shared/guard/GraphQLAuth.guard'

@Resolver(() => LiveTourModel)
export class LiveToursResolver {
  constructor(private readonly liveToursService: LiveToursService) {
    this.liveToursService = liveToursService
  }

  @Query(() => [LiveTourModel])
  public async getLiveTours() {
    return this.liveToursService.findAll()
  }

  @Query(() => LiveTourModel)
  public async getLiveTourById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.liveToursService.findOneById(id)
  }

  @Mutation(() => LiveTourModel)
  @UseGuards(JwtAuthGuard)
  public async createLiveTour(@Args('input') input: CreateLiveTourInput) {
    return this.liveToursService.create(input)
  }

  @Mutation(() => LiveTourModel)
  @UseGuards(JwtAuthGuard)
  public async updateLiveTourById(@Args('input') input: UpdateLiveTourInput) {
    return this.liveToursService.update(input)
  }

  @Mutation(() => LiveTourModel)
  @UseGuards(JwtAuthGuard)
  public async deleteLiveTourById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.liveToursService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  @UseGuards(JwtAuthGuard)
  public async deleteLiveTours(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.liveToursService.batchDelete(ids)
  }
}
