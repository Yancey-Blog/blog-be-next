import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdateGlobalSettingInput } from './dtos/update-global-setting.input'
import { GlobalSettingModel } from './models/global-setting.model'
import { GlobalSetting } from './interfaces/global-setting.interface'

@Injectable()
export class GlobalSettingService {
  constructor(
    @InjectModel('GlobalSetting')
    private readonly globalSettingService: Model<GlobalSetting>,
  ) {
    this.globalSettingService = globalSettingService
  }

  public async findOne(): Promise<GlobalSettingModel> {
    const res = await this.globalSettingService.find({})

    if (res.length !== 0) return res[0]

    return this.globalSettingService.create({})
  }

  public async update(globalSettingInput: UpdateGlobalSettingInput): Promise<GlobalSettingModel> {
    const { id, ...rest } = globalSettingInput
    return this.globalSettingService.findByIdAndUpdate(id, rest, { new: true })
  }
}
