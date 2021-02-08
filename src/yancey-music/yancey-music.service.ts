import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Document } from 'mongoose'
import { CreateYanceyMusicInput } from './dtos/create-yancey-music.input'
import { UpdateYanceyMusicInput } from './dtos/update-yancey-music.input'
import { YanceyMusicModel } from './models/yancey-music.model'
import { YanceyMusic } from './interfaces/yancey-music.interface'
import { BatchDeleteModel } from '../database/models/batch-delete.model'

@Injectable()
export class YanceyMusicService {
  constructor(
    @InjectModel('YanceyMusic')
    private readonly yanceyMusicModel: Model<YanceyMusic>,
  ) {
    this.yanceyMusicModel = yanceyMusicModel
  }

  public async findAll(): Promise<YanceyMusicModel[]> {
    return this.yanceyMusicModel.find({}).sort({ updatedAt: -1 })
  }

  public async findOneById(id: string): Promise<YanceyMusicModel> {
    return this.yanceyMusicModel.findById(id)
  }

  public async create(yanceyMusicInput: CreateYanceyMusicInput): Promise<YanceyMusicModel> {
    return this.yanceyMusicModel.create(yanceyMusicInput)
  }

  public async update(yanceyMusicInput: UpdateYanceyMusicInput): Promise<YanceyMusicModel> {
    const { id, ...rest } = yanceyMusicInput
    return this.yanceyMusicModel.findByIdAndUpdate(id, rest, { new: true })
  }

  public async deleteOneById(id: string): Promise<YanceyMusicModel> {
    return this.yanceyMusicModel.findByIdAndDelete(id)
  }

  public async batchDelete(ids: string[]): Promise<BatchDeleteModel> {
    const res = await this.yanceyMusicModel.deleteMany({
      _id: { $in: ids },
    })

    return {
      ...res,
      ids,
    }
  }
}
