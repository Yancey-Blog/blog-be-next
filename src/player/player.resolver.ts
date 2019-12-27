import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { PlayerService } from './player.service'
import { PlayerModel } from './models/player.model'
import { BatchDeleteModel } from '../database/models/database.model'
import { CreatePlayerInput } from './dtos/create-player.input'
import { UpdatePlayerInput } from './dtos/update-player.input'

@Resolver(() => PlayerModel)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {
    this.playerService = playerService
  }

  @Query(() => [PlayerModel])
  public async getPlayer() {
    return this.playerService.findAll()
  }

  @Query(() => PlayerModel)
  public async getPlayerById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.playerService.findOneById(id)
  }

  @Mutation(() => PlayerModel)
  public async createPlayer(@Args('input') input: CreatePlayerInput) {
    return this.playerService.create(input)
  }

  @Mutation(() => PlayerModel)
  public async updatePlayerById(@Args('input') input: UpdatePlayerInput) {
    return this.playerService.update(input)
  }

  @Mutation(() => PlayerModel)
  public async deletePlayerById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.playerService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  public async deletePlayer(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.playerService.batchDelete(ids)
  }

  @Mutation(() => null)
  public async switchIsPubilc(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.playerService.switchIsPubilc(ids)
  }
}
