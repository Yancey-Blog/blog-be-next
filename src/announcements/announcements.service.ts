import { Injectable } from '@nestjs/common'
import { Observable, of } from 'rxjs'
// import { NewRecipeInput } from './dtos/new-recipe.input'
import { AnnouncementsModel } from './models/announcements.model'
import { announcements } from '../mocks/announcement'

@Injectable()
export class AnnouncementsService {
  public findAll(): Observable<AnnouncementsModel[]> {
    return of(announcements)
  }

  public findOneById(id: string): Observable<AnnouncementsModel> {
    return of(announcements.find(announcement => announcement._id === id))
  }

  // async create(data: NewRecipeInput): Promise<AnnouncementsModel> {
  //   return {} as any
  // }

  // async remove(id: string): Promise<boolean> {
  //   return true
  // }
}
