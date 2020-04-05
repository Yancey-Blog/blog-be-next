import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Motto } from './interfaces/motto.interface'
import { CreateMottoInput } from './dtos/create-motto.input'
import { UpdateMottoInput } from './dtos/update-motto.input'
import { ExchangePositionInput } from './dtos/exchange-position.input'

@Injectable()
export class MottosService {
  constructor(
    @InjectModel('Motto')
    private readonly mottoModel: Model<Motto>,
  ) {
    this.mottoModel = mottoModel
  }

  private async getTotalCount(): Promise<number> {
    return this.mottoModel.countDocuments()
  }

  public async findAll() {
    return this.mottoModel.find({}).sort({ updatedAt: -1 })
  }

  public async findOneById(id: string) {
    return this.mottoModel.findById(id)
  }

  public async create(input: CreateMottoInput) {
    const count = await this.getTotalCount()
    return this.mottoModel.create({ ...input, position: count + 1 })
  }

  public async update(input: UpdateMottoInput) {
    const { id, content } = input

    return this.mottoModel.findByIdAndUpdate(
      id,
      {
        content,
      },
      { new: true },
    )
  }

  public async exchangePosition(input: ExchangePositionInput) {
    const { id, exchangedId, position, exchangedPosition } = input

    await this.mottoModel.findByIdAndUpdate(
      exchangedId,
      {
        position,
      },
      { new: true },
    )

    return this.mottoModel.findByIdAndUpdate(
      id,
      {
        position: exchangedPosition,
      },
      { new: true },
    )
  }

  public async deleteOneById(id: string) {
    return this.mottoModel.findByIdAndDelete(id)
  }

  public async batchDelete(ids: string[]) {
    const res = await this.mottoModel.deleteMany({
      _id: { $in: ids },
    })

    return {
      ...res,
      ids,
    }
  }
}
