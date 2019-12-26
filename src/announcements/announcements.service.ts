import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Announcement } from './interfaces/announcement.interface'
import { CreateAnnouncementInput } from './dtos/create-announcement.input'
import { UpdateAnnouncementInput } from './dtos/update-announcement.input'

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel('Announcement')
    private readonly announcementModel: Model<Announcement>,
  ) {
    this.announcementModel = announcementModel
  }

  public async findAll() {
    return this.announcementModel.find({}).sort({ updatedAt: -1 })
  }

  public async findOneById(id: string) {
    return this.announcementModel.findById(id)
  }

  public async create(dto: CreateAnnouncementInput) {
    return this.announcementModel.create(dto)
  }

  public async update(dto: UpdateAnnouncementInput) {
    const { id, content } = dto
    return this.announcementModel.findByIdAndUpdate(
      id,
      {
        content,
      },
      { new: true },
    )
  }

  public async deleteOneById(id: string) {
    return this.announcementModel.findByIdAndDelete(id)
  }

  public async batchDelete(ids: string[]) {
    return this.announcementModel.deleteMany({
      _id: { $in: ids },
    })
  }
}
