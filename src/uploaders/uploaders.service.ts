import { Injectable, BadRequestException } from '@nestjs/common'
import OSS from 'ali-oss'
import { ConfigService } from '../config/config.service'
import { ALI_OSS_END_POINT, ALI_OSS_REGION } from '../shared/constants'
import { IAliOSSRes } from './interfaces/alioss.interface'
import { IMulterFile } from './interfaces/multer.interface'

@Injectable()
export class UploadersService {
  private readonly oss: OSS

  constructor(configService: ConfigService) {
    const {
      ALI_ACCESS_KEY_ID,
      ALI_ACCESS_KEY_SECRET,
      ALI_OSS_BUCKET,
    } = configService.getAliOSSKeys()

    this.oss = new OSS({
      accessKeyId: ALI_ACCESS_KEY_ID,
      accessKeySecret: ALI_ACCESS_KEY_SECRET,
      bucket: ALI_OSS_BUCKET,
      region: ALI_OSS_REGION,
      endpoint: ALI_OSS_END_POINT,
      secure: true,
      cname: true,
    })
  }

  public async upload(file: IMulterFile) {
    try {
      const { name, url } = (await this.oss.put(file.originalname, file.buffer)) as IAliOSSRes
      return {
        name,
        url,
      }
    } catch (err) {
      return err
    }
  }
}
