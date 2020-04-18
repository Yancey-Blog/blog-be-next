import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePlayerInput } from './dtos/create-player.input'
import { UpdatePlayerInput } from './dtos/update-player.input'
import { PlayerModel } from './models/player.model'
import { Player } from './interfaces/player.interface'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { BatchUpdateModel } from '../database/models/batch-update.model'
import { ExchangePositionInput } from '../shared/interfaces/exchange-position.input'

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<Player>,
  ) {
    this.playerModel = playerModel
  }

  public async findAllPubilc() {
    return this.playerModel.find({ isPublic: { $ne: false } }).sort({ updatedAt: -1 })
  }

  public async findAll(): Promise<PlayerModel[]> {
    return this.playerModel.find({}).sort({ updatedAt: -1 })
  }

  public async findOneById(id: string): Promise<PlayerModel> {
    return this.playerModel.findById(id)
  }

  public async create(playerInput: CreatePlayerInput): Promise<PlayerModel> {
    const all = await this.findAll()
    const weight = all[0] ? all[0].weight : 0
    return this.playerModel.create({ ...playerInput, weight: weight + 1 })
  }

  public async update(playerInput: UpdatePlayerInput): Promise<PlayerModel> {
    const { id, ...rest } = playerInput
    return this.playerModel.findByIdAndUpdate(id, rest, { new: true })
  }

  public async exchangePosition(input: ExchangePositionInput) {
    const { id, exchangedId, weight, exchangedWeight } = input

    const exchanged = await this.playerModel.findByIdAndUpdate(
      exchangedId,
      {
        weight,
      },
      { new: true },
    )

    const curr = await this.playerModel.findByIdAndUpdate(
      id,
      {
        weight: exchangedWeight,
      },
      { new: true },
    )

    return [exchanged, curr]
  }

  public async deleteOneById(id: string): Promise<PlayerModel> {
    return this.playerModel.findByIdAndDelete(id)
  }

  public async batchDelete(ids: string[]): Promise<BatchDeleteModel> {
    const res = await this.playerModel.deleteMany({
      _id: { $in: ids },
    })

    return {
      ...res,
      ids,
    }
  }

  public async batchUpdate(ids: string[]): Promise<BatchUpdateModel> {
    const res = await this.playerModel.updateMany(
      {
        _id: { $in: ids },
      },
      {
        $set: { isPublic: false },
      },
    )

    return {
      ...res,
      ids,
    }
  }
}
