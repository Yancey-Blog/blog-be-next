import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { AnnouncementsModel } from './dtos/announcements.model'
import { Announcement } from './interfaces/announcement.interface'
import { AnnouncementInput } from './dtos/announcement.input'

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel('Announcement')
    private readonly AnnouncementModel: Model<Announcement>,
  ) {
    this.AnnouncementModel = AnnouncementModel
  }

  public async findAll(): Promise<AnnouncementsModel[]> {
    const res = await this.AnnouncementModel.find({}).sort({ updatedAt: -1 })
    return res
  }

  public async findOneById(id: string): Promise<AnnouncementsModel> {
    const res = await this.AnnouncementModel.findById(id)
    return res
  }

  public async create(dto: AnnouncementInput): Promise<AnnouncementsModel> {
    const res = await this.AnnouncementModel.create(dto)
    return res
  }

  public async update(id: string, announcement: string): Promise<AnnouncementsModel> {
    const res = await this.AnnouncementModel.findByIdAndUpdate(id, {
      announcement,
    })
    return res
  }

  public async deleteOneById(id: string): Promise<AnnouncementsModel> {
    const res = await this.AnnouncementModel.findByIdAndDelete(id)
    return res
  }

  // FIXME:
  public async batchDelete(ids: string[]) {
    const res = await this.AnnouncementModel.remove({
      _id: { $in: ids },
    })
    return res
  }
}
