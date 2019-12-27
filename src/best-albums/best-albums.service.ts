import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateBestAlbumInput } from './dtos/create-best-album.input'
import { UpdateBestAlbumInput } from './dtos/update-best-album.input'
import { BestAlbumModel } from './models/best-albums.model'
import { BestAlbum } from './interfaces/best-albums.interface'
import { BatchDeleteModel } from '../database/models/database.model'

@Injectable()
export class BestAlbumsService {
  constructor(
    @InjectModel('BestAlbum')
    private readonly bestAlbumModel: Model<BestAlbum>,
  ) {
    this.bestAlbumModel = bestAlbumModel
  }

  public async findAll(): Promise<BestAlbumModel[]> {
    return this.bestAlbumModel.find({}).sort({ updatedAt: -1 })
  }

  public async findOneById(id: string): Promise<BestAlbumModel> {
    return this.bestAlbumModel.findById(id)
  }

  public async create(bestAlbumInput: CreateBestAlbumInput): Promise<BestAlbumModel> {
    return this.bestAlbumModel.create(bestAlbumInput)
  }

  public async update(bestAlbumInput: UpdateBestAlbumInput): Promise<BestAlbumModel> {
    const { id, ...rest } = bestAlbumInput
    return this.bestAlbumModel.findByIdAndUpdate(id, rest, { new: true })
  }

  public async deleteOneById(id: string): Promise<BestAlbumModel> {
    return this.bestAlbumModel.findByIdAndDelete(id)
  }

  public async batchDelete(ids: string[]): Promise<BatchDeleteModel> {
    return this.bestAlbumModel.deleteMany({
      _id: { $in: ids },
    })
  }
}
