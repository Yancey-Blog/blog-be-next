import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
// import { NewRecipeInput } from './dtos/new-recipe.input'
import { AnnouncementsModel } from './models/announcements.model'
import { IAnnouncement } from './interfaces/announcement.interface'

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

  // public remove(id: string): Observable<boolean> {
  //   return of(true)
  // }
}
