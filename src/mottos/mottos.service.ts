import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Motto } from './interfaces/motto.interface'
import { CreateMottoDto } from './dtos/createMotto.dto'

@Injectable()
export class MottosService {
  constructor(
    @InjectModel('Motto')
    private readonly MottoModel: Model<Motto>,
  ) {
    this.MottoModel = MottoModel
  }

  public async findAll(): Promise<Motto[]> {
    const res = await this.MottoModel.find({}).sort({ updatedAt: -1 })
    return res
  }

  public async findOneById(id: string): Promise<Motto> {
    const res = await this.MottoModel.findById(id)
    return res
  }

  public async create(createMottoDto: CreateMottoDto): Promise<Motto> {
    const res = await this.MottoModel.create(createMottoDto)
    return res
  }

  public async update(id: string, createMottoDto: CreateMottoDto): Promise<Motto> {
    const res = await this.MottoModel.findByIdAndUpdate(id, createMottoDto)
    return res
  }

  public async deleteOneById(id: string): Promise<Motto> {
    const res = await this.MottoModel.findByIdAndDelete(id)
    return res
  }

  public async batchDelete(ids: string[]) {
    const res = await this.MottoModel.deleteMany({
      _id: { $in: ids },
    })
    return res
  }
}
