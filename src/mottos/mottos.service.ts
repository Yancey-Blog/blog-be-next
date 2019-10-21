import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { IMotto } from './interfaces/motto.interface'
import { CreateMottoDto } from './dtos/create-motto.dto'

@Injectable()
export class MottosService {
  constructor(
    @InjectModel('Motto')
    private readonly MottoModel: Model<IMotto>,
  ) {
    this.MottoModel = MottoModel
  }

  public async findAll(): Promise<IMotto[]> {
    const res = await this.MottoModel.find({}).sort({ updated_at: -1 })
    return res
  }

  public async findOneById(id: string): Promise<IMotto> {
    const res = await this.MottoModel.findById(id)
    return res
  }

  public async create(createMottoDto: CreateMottoDto): Promise<IMotto> {
    const createdMotto = new this.MottoModel(createMottoDto)
    const res = await createdMotto.save()
    return res
  }

  public async update(
    id: string,
    createMottoDto: CreateMottoDto,
  ): Promise<IMotto> {
    const res = await this.MottoModel.findByIdAndUpdate(id, createMottoDto)
    return res
  }

  public async deleteOneById(id: string): Promise<IMotto> {
    const res = await this.MottoModel.findByIdAndDelete(id)
    return res
  }

  public async batchDelete(ids: string[]): Promise<any> {
    const res = await this.MottoModel.remove({
      _id: { $in: ids },
    })
    return res
  }
}
