import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql'
import { PlayerService } from './player.service'
import { PlayerModel } from './models/player.model'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { BatchUpdateModel } from '../database/models/batch-update.model'
import { CreatePlayerInput } from './dtos/create-player.input'
import { UpdatePlayerInput } from './dtos/update-player.input'
import { JwtAuthGuard } from '../shared/guard/GraphQLAuth.guard'
import { ExchangePositionInput } from '../shared/interfaces/exchange-position.input'

@Resolver(() => PlayerModel)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {
    this.playerService = playerService
  }

  @Query(() => [PlayerModel])
  public async players(): Promise<PlayerModel[]> {
    return this.playerService.findAllPubilc()
  }

  @Query(() => [PlayerModel])
  @UseGuards(JwtAuthGuard)
  public async getPlayers() {
    return this.playerService.findAll()
  }

  @Query(() => PlayerModel)
  @UseGuards(JwtAuthGuard)
  public async getPlayerById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.playerService.findOneById(id)
  }

  @Mutation(() => PlayerModel)
  @UseGuards(JwtAuthGuard)
  public async createPlayer(@Args('input') input: CreatePlayerInput) {
    return this.playerService.create(input)
  }

  @Mutation(() => PlayerModel)
  @UseGuards(JwtAuthGuard)
  public async updatePlayerById(@Args('input') input: UpdatePlayerInput) {
    return this.playerService.update(input)
  }

  @Mutation(() => [PlayerModel])
  @UseGuards(JwtAuthGuard)
  public async exchangePositionPlayer(
    @Args('input') input: ExchangePositionInput,
  ): Promise<PlayerModel[]> {
    return this.playerService.exchangePosition(input)
  }

  @Mutation(() => PlayerModel)
  @UseGuards(JwtAuthGuard)
  public async deletePlayerById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.playerService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  @UseGuards(JwtAuthGuard)
  public async deletePlayers(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.playerService.batchDelete(ids)
  }

  @Mutation(() => BatchUpdateModel)
  @UseGuards(JwtAuthGuard)
  public async offlinePlayers(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.playerService.batchUpdate(ids)
  }
}
