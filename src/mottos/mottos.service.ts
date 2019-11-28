import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Motto } from './interfaces/motto.interface'
import { CreateMottoDto } from './dtos/createMotto.dto'
import { IBatchDelete } from '../database/interfaces/batchDelete.interface'

@Injectable()
export class MottosService {
  constructor(
    @InjectModel('Motto')
    private readonly MottoModel: Model<Motto>,
  ) {
    this.MottoModel = MottoModel
  }

  public async findAll(): Promise<Motto[]> {
    const res = await this.MottoModel.find({}).sort({ updated_at: -1 })
    return res
  }

  public async findOneById(id: string): Promise<Motto> {
    const res = await this.MottoModel.findById(id)
    return res
  }

  public async create(createMottoDto: CreateMottoDto): Promise<Motto> {
    const createdMotto = new this.MottoModel(createMottoDto)
    const res = await createdMotto.save()
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

  public async batchDelete(ids: string[]): Promise<IBatchDelete> {
    const res = await this.MottoModel.remove({
      _id: { $in: ids },
    })
    return res
  }
}
