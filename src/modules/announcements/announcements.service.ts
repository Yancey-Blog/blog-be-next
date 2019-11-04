import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { AnnouncementsModel } from './dtos/announcements.model'
import { IAnnouncement } from './interfaces/announcement.interface'
import { AnnouncementInput } from './dtos/announcement.input'

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel('Announcement')
    private readonly AnnouncementModel: Model<IAnnouncement>,
  ) {
    this.AnnouncementModel = AnnouncementModel
  }

  public async findAll(): Promise<AnnouncementsModel[]> {
    const res = await this.AnnouncementModel.find({}).sort({ updated_at: -1 })
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

  public async update(
    id: string,
    announcement: string,
  ): Promise<AnnouncementsModel> {
    const res = await this.AnnouncementModel.findByIdAndUpdate(id, {
      announcement,
    })
    return res
  }

  public async deleteOneById(id: string): Promise<AnnouncementsModel> {
    const res = await this.AnnouncementModel.findByIdAndDelete(id)
    return res
  }

  public async batchDelete(ids: string[]): Promise<any> {
    const res = await this.AnnouncementModel.remove({
      _id: { $in: ids },
    })
    return res
  }
}
