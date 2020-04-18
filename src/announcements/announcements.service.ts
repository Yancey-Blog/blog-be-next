import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Announcement } from './interfaces/announcement.interface'
import { CreateAnnouncementInput } from './dtos/create-announcement.input'
import { UpdateAnnouncementInput } from './dtos/update-announcement.input'
import { ExchangePositionInput } from '../shared/interfaces/exchange-position.input'

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel('Announcement')
    private readonly announcementModel: Model<Announcement>,
  ) {
    this.announcementModel = announcementModel
  }

  public async findAll() {
    return this.announcementModel.find().sort({ weight: -1 })
  }

  public async findOneById(id: string) {
    return this.announcementModel.findById(id)
  }

  public async create(input: CreateAnnouncementInput) {
    const all = await this.findAll()
    const weight = all[0] ? all[0].weight : 0
    return this.announcementModel.create({ ...input, weight: weight + 1 })
  }

  public async update(input: UpdateAnnouncementInput) {
    const { id, content } = input

    return this.announcementModel.findByIdAndUpdate(
      id,
      {
        content,
      },
      { new: true },
    )
  }

  public async exchangePosition(input: ExchangePositionInput) {
    const { id, exchangedId, weight, exchangedWeight } = input

    const exchanged = await this.announcementModel.findByIdAndUpdate(
      exchangedId,
      {
        weight,
      },
      { new: true },
    )

    const curr = await this.announcementModel.findByIdAndUpdate(
      id,
      {
        weight: exchangedWeight,
      },
      { new: true },
    )

    return [exchanged, curr]
  }

  public async deleteOneById(id: string) {
    return this.announcementModel.findByIdAndDelete(id)
  }

  public async batchDelete(ids: string[]) {
    const res = await this.announcementModel.deleteMany({
      _id: { $in: ids },
    })

    return {
      ...res,
      ids,
    }
  }
}
