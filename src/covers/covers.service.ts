import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateCoverInput } from './dtos/create-cover.input'
import { UpdateCoverInput } from './dtos/update-cover.input'
import { ExchangePositionInput } from '../shared/interfaces/exchange-position.input'
import { CoverModel } from './models/covers.model'
import { Cover } from './interfaces/covers.interface'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { BatchUpdateModel } from '../database/models/batch-update.model'

@Injectable()
export class CoversService {
  constructor(
    @InjectModel('Cover')
    private readonly coverModel: Model<Cover>,
  ) {
    this.coverModel = coverModel
  }

  public async findAll(): Promise<CoverModel[]> {
    return this.coverModel.find({}).sort({ updatedAt: -1 })
  }

  public async findOneById(id: string): Promise<CoverModel> {
    return this.coverModel.findById(id)
  }

  public async create(input: CreateCoverInput): Promise<CoverModel> {
    const all = await this.findAll()
    const weight = all[0] ? all[0].weight : 0
    return this.coverModel.create({ ...input, weight: weight + 1 })
  }

  public async update(playerInput: UpdateCoverInput): Promise<CoverModel> {
    const { id, ...rest } = playerInput
    return this.coverModel.findByIdAndUpdate(id, rest, { new: true })
  }

  public async exchangePosition(input: ExchangePositionInput) {
    const { id, exchangedId, weight, exchangedWeight } = input

    const exchanged = await this.coverModel.findByIdAndUpdate(
      exchangedId,
      {
        weight,
      },
      { new: true },
    )

    const curr = await this.coverModel.findByIdAndUpdate(
      id,
      {
        weight: exchangedWeight,
      },
      { new: true },
    )

    return [exchanged, curr]
  }

  public async deleteOneById(id: string): Promise<CoverModel> {
    return this.coverModel.findByIdAndDelete(id)
  }

  public async batchDelete(ids: string[]): Promise<BatchDeleteModel> {
    const res = await this.coverModel.deleteMany({
      _id: { $in: ids },
    })

    return {
      ...res,
      ids,
    }
  }

  public async batchUpdate(ids: string[]): Promise<BatchUpdateModel> {
    const res = await this.coverModel.updateMany(
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
