import { Injectable } from '@nestjs/common'
import OSS from 'ali-oss'
import { ALI_OSS_END_POINT, ALI_OSS_REGION } from '../../shared/constants'
import { IAliOssRes } from './interfaces/alioss.interface'
import { IMulterFile } from './interfaces/multer.interface'

const {
  ALI_OSS_ACCESS_KEY_ID,
  ALI_OSS_ACCESS_KEY_SECRET,
  ALI_OSS_BUCKET,
} = process.env

const oss = new OSS({
  accessKeyId: ALI_OSS_ACCESS_KEY_ID,
  accessKeySecret: ALI_OSS_ACCESS_KEY_SECRET,
  bucket: ALI_OSS_BUCKET,
  region: ALI_OSS_REGION,
  secure: true,
  cname: true,
  endpoint: ALI_OSS_END_POINT,
})

@Injectable()
export class UploadersService {
  public async upload(file: IMulterFile) {
    const { name, url, statusCode, statusMessage } = (await oss.put(
      file.originalname,
      file.buffer,
    )) as IAliOssRes
    return {
      name,
      url,
      statusCode,
      statusMessage,
    }
  }
}
