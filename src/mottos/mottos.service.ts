import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Motto } from './interfaces/motto.interface'
import { CreateMottoInput } from './dtos/create-motto.input'
import { UpdateMottoInput } from './dtos/update-motto.input'

@Injectable()
export class MottosService {
  constructor(
    @InjectModel('Motto')
    private readonly mottoModel: Model<Motto>,
  ) {
    this.mottoModel = mottoModel
  }

  public async findAll() {
    return this.mottoModel.find({}).sort({ updatedAt: -1 })
  }

  public async findOneById(id: string) {
    return this.mottoModel.findById(id)
  }

  public async create(dto: CreateMottoInput) {
    return this.mottoModel.create(dto)
  }

  public async update(dto: UpdateMottoInput) {
    const { id, content } = dto
    return this.mottoModel.findByIdAndUpdate(
      id,
      {
        content,
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
