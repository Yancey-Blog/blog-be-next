import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateOpenSourceInput } from './dtos/create-open-source.input'
import { UpdateOpenSourceInput } from './dtos/update-open-source.input'
import { OpenSource } from './interfaces/open-sources.interface'

@Injectable()
export class OpenSourcesService {
  constructor(
    @InjectModel('OpenSource')
    private readonly OpenSourceModel: Model<OpenSource>,
  ) {
    this.OpenSourceModel = OpenSourceModel
  }

  public async findAll() {
    return this.OpenSourceModel.find({}).sort({ updatedAt: -1 })
  }

  public async findOneById(id: string) {
    const res = await this.OpenSourceModel.findById(id)
    return res
  }

  public async create(openSourceInput: CreateOpenSourceInput) {
    const res = await this.OpenSourceModel.create(openSourceInput)
    return res
  }

  public async update(openSourceInput: UpdateOpenSourceInput) {
    const { id, ...rest } = openSourceInput
    const res = await this.OpenSourceModel.findByIdAndUpdate(id, {
      rest,
    })
    return res
  }

  public async deleteOneById(id: string) {
    const res = await this.OpenSourceModel.findByIdAndDelete(id)
    return res
  }

  public async batchDelete(ids: string[]) {
    return this.OpenSourceModel.remove({
      _id: { $in: ids },
    })
    // return res
  }
}
