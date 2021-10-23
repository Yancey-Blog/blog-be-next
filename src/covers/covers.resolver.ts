import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql'
import { CoversService } from './covers.service'
import { CoverModel } from './models/covers.model'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { BatchUpdateModel } from '../database/models/batch-update.model'
import { CreateCoverInput } from './dtos/create-cover.input'
import { UpdateCoverInput } from './dtos/update-cover.input'
import { ExchangePositionInput } from '../shared/interfaces/exchange-position.input'
import { JwtAuthGuard } from '../shared/guard/GraphQLAuth.guard'

@Resolver(() => CoverModel)
export class CoversResolver {
  constructor(private readonly coversService: CoversService) {
    this.coversService = coversService
  }

  @Query(() => [CoverModel])
  public async getAllPublicCovers(): Promise<CoverModel[]> {
    return this.coversService.findAllPubilc()
  }

  @Query(() => [CoverModel])
  @UseGuards(JwtAuthGuard)
  public async getCovers() {
    return this.coversService.findAll()
  }

  @Query(() => CoverModel)
  @UseGuards(JwtAuthGuard)
  public async getCoverById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.coversService.findOneById(id)
  }

  @Mutation(() => CoverModel)
  @UseGuards(JwtAuthGuard)
  public async createCover(@Args('input') input: CreateCoverInput) {
    return this.coversService.create(input)
  }

  @Mutation(() => CoverModel)
  @UseGuards(JwtAuthGuard)
  public async updateCoverById(@Args('input') input: UpdateCoverInput) {
    return this.coversService.update(input)
  }

  @Mutation(() => [CoverModel])
  @UseGuards(JwtAuthGuard)
  public async exchangePositionCover(
    @Args('input') input: ExchangePositionInput,
  ): Promise<CoverModel[]> {
    return this.coversService.exchangePosition(input)
  }

  @Mutation(() => CoverModel)
  @UseGuards(JwtAuthGuard)
  public async deleteCoverById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.coversService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  @UseGuards(JwtAuthGuard)
  public async deleteCovers(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.coversService.batchDelete(ids)
  }

  @Mutation(() => BatchUpdateModel)
  @UseGuards(JwtAuthGuard)
  public async publicCovers(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.coversService.batchUpdate(ids)
  }
}
