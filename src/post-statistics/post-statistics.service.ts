import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { PostStatistics } from './interfaces/post-statistics.interface'
import { CreatePostStatisticsInput } from './dtos/create-post-statistics.input'

@Injectable()
export class PostStatisticsService {
  constructor(
    @InjectModel('PostStatistics')
    private readonly postStatisticsModel: Model<PostStatistics>,
  ) {
    this.postStatisticsModel = postStatisticsModel
  }

  public async findAll() {
    return this.postStatisticsModel.find({})
  }

  public async create(input: CreatePostStatisticsInput) {
    return this.postStatisticsModel.create(input)
  }
}
