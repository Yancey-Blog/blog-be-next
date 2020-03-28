import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { randomSeries } from 'yancey-js-util'
import fs from 'fs-extra'
import { Motto } from './interfaces/motto.interface'
import { CreateMottoDto } from './dtos/createMotto.dto'
import { RECOVERY_CODES_PATH } from '../shared/constants'

@Injectable()
export class MottosService {
  constructor(
    @InjectModel('Motto')
    private readonly MottoModel: Model<Motto>,
  ) {
    this.MottoModel = MottoModel
  }

  public async findAll(): Promise<Motto[]> {
    const res = await this.MottoModel.find({}).sort({ updatedAt: -1 })
    return res
  }

  public async findOneById(id: string): Promise<Motto> {
    const res = await this.MottoModel.findById(id)
    return res
  }

  public async create(createMottoDto: CreateMottoDto): Promise<Motto> {
    const res = await this.MottoModel.create(createMottoDto)
    return res
  }

  public async update(id: string, createMottoDto: CreateMottoDto): Promise<Motto> {
    const res = await this.MottoModel.findByIdAndUpdate(id, createMottoDto)
    return res
  }

  public async deleteOneById(id: string): Promise<Motto> {
    const res = await this.MottoModel.findByIdAndDelete(id)
    return res
  }

  public async batchDelete(ids: string[]) {
    const res = await this.MottoModel.deleteMany({
      _id: { $in: ids },
    })
    return res
  }

  public generateFile() {
    const data = Array.from({ length: 16 }, () => '')

    for (let i = 0; i < 16; i += 1) {
      const token = randomSeries(10, 16)
      const series = `${token.slice(0, 5)}-${token.slice(5)}`
      data[i] = series
    }

    return data
  }

  public generateRecoveryFile() {
    fs.writeFileSync(RECOVERY_CODES_PATH, '', 'UTF-8')
  }
}
