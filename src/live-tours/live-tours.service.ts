import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateLiveTourInput } from './dtos/create-live-tour.input'
import { UpdateLiveTourInput } from './dtos/update-live-tour.input'
import { LiveTourModel } from './models/live-tours.model'
import { LiveTour } from './interfaces/live-tours.interface'
import { BatchDeleteModel } from '../database/models/database.model'

@Injectable()
export class LiveToursService {
  constructor(
    @InjectModel('LiveTour')
    private readonly liveTourModel: Model<LiveTour>,
  ) {
    this.liveTourModel = liveTourModel
  }

  public async findAll(): Promise<LiveTourModel[]> {
    return this.liveTourModel.find({}).sort({ updatedAt: -1 })
  }

  public async findOneById(id: string): Promise<LiveTourModel> {
    return this.liveTourModel.findById(id)
  }

  public async create(liveTourInput: CreateLiveTourInput): Promise<LiveTourModel> {
    return this.liveTourModel.create(liveTourInput)
  }

  public async update(liveTourInput: UpdateLiveTourInput): Promise<LiveTourModel> {
    const { id, ...rest } = liveTourInput
    return this.liveTourModel.findByIdAndUpdate(id, rest, { new: true })
  }

  public async deleteOneById(id: string): Promise<LiveTourModel> {
    return this.liveTourModel.findByIdAndDelete(id)
  }

  public async batchDelete(ids: string[]): Promise<BatchDeleteModel> {
    return this.liveTourModel.deleteMany({
      _id: { $in: ids },
    })
  }
}
