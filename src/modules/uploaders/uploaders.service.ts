import { Injectable } from '@nestjs/common'
import OSS from 'ali-oss'
import { ConfigService } from '../../config/config.service'
import { ALI_OSS_END_POINT, ALI_OSS_REGION } from '../../shared/constants'
import { IAliOSSRes } from './interfaces/alioss.interface'
import { IMulterFile } from './interfaces/multer.interface'

@Injectable()
export class UploadersService {
  private readonly oss: OSS

  constructor(configService: ConfigService) {
    const {
      accessKeyId,
      accessKeySecret,
      bucket,
    } = configService.getAliOSSKeys()

    this.oss = new OSS({
      accessKeyId,
      accessKeySecret,
      bucket,
      region: ALI_OSS_REGION,
      secure: true,
      cname: true,
      endpoint: ALI_OSS_END_POINT,
    })
  }

  public async upload(file: IMulterFile) {
    const {
      name,
      url,
      res: { statusCode, statusMessage },
    } = (await this.oss.put(file.originalname, file.buffer)) as IAliOSSRes
    return {
      name,
      url,
      statusCode,
      statusMessage,
    }
  }
}
