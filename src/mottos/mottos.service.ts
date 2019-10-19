import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { IMotto } from './interfaces/motto.interface'

@Injectable()
export class MottosService {
  constructor(
    @InjectModel('Motto')
    private readonly mottoModel: Model<IMotto>,
  ) {
    this.mottoModel = mottoModel
  }

  public create(motto: string): Observable<any> {
    // const createdMotto = new this.mottoModel(motto)
    // return of(createdMotto.save())
    return of(motto)
  }

  // public remove(id: string): Observable<boolean> {
  //   return of(true)
  // }
}
