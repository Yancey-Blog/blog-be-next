import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { IMotto } from './interfaces/motto.interface'
import { CreateMottoDto } from './dtos/create-motto.dto'

@Injectable()
export class MottosService {
  constructor(
    @InjectModel('Motto')
    private readonly MottoModel: Model<IMotto>,
  ) {
    this.MottoModel = MottoModel
  }

  public async findAll(): Promise<IMotto[]> {
    const res = await this.MottoModel.find({}).sort({ updated_at: -1 })
    return res
  }

  public async create(createMottoDto: CreateMottoDto): Promise<IMotto> {
    const createdMotto = new this.MottoModel(createMottoDto)
    const res = await createdMotto.save()
    return res
  }

  // public remove(id: string): Observable<boolean> {
  //   return of(true)
  // }
}
