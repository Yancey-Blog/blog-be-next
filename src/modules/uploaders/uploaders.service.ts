import { Injectable } from '@nestjs/common'
import OSS from 'ali-oss'
import { ConfigService } from '../../config/config.service'
import { ALI_OSS_END_POINT, ALI_OSS_REGION } from '../../shared/constants'
import { IAliOSSRes } from './interfaces/alioss.interface'
import { IMulterFile } from './interfaces/multer.interface'

@Injectable()
export class UploadersService {
  private readonly accessKeyId: string

  private readonly accessKeySecret: string

  private readonly bucket: string

  private readonly oss: OSS

  constructor(configService: ConfigService) {
    this.accessKeyId = configService.get('ALI_OSS_ACCESS_KEY_ID')
    this.accessKeySecret = configService.get('ALI_OSS_ACCESS_KEY_SECRET')
    this.bucket = configService.get('ALI_OSS_BUCKET')
    this.oss = new OSS({
      accessKeyId: this.accessKeyId,
      accessKeySecret: this.accessKeySecret,
      bucket: this.bucket,
      region: ALI_OSS_REGION,
      secure: true,
      cname: true,
      endpoint: ALI_OSS_END_POINT,
    })
  }

  public async upload(file: IMulterFile) {
    const { name, url, statusCode, statusMessage } = (await this.oss.put(
      file.originalname,
      file.buffer,
    )) as IAliOSSRes
    return {
      name,
      url,
      statusCode,
      statusMessage,
    }
  }
}
