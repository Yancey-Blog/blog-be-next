import { Injectable, BadRequestException } from '@nestjs/common'
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'
import { randomSeries, getFileExtension } from 'yancey-js-util'
import sharp from 'sharp'
import {
  AZURE_STORAGE_URL,
  AZURE_STORAGE_CONTAINER_NAME,
  BASE_IMAGE_EXTENSIONS,
} from '../shared/constants'
import { ConfigService } from '../config/config.service'
import { IMulterFile } from './interfaces/multer.interface'

@Injectable()
export class UploaderService {
  private readonly containerClient: ContainerClient

  constructor(configService: ConfigService) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      configService.getAzureStorageConnectionString(),
    )

    this.containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME)
  }

  private async convertImageToWebp(image: Buffer) {
    const buffer = await sharp(image, { animated: true }).webp({ quality: 80 }).toBuffer()
    return buffer
  }

  private async uploadToAzureBlob(fileName: string, extension: string, buffer: Buffer) {
    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(`${fileName}.${extension}`)
      const { errorCode } = await blockBlobClient.upload(buffer, Buffer.byteLength(buffer))
      return errorCode
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  public async uploadFile(file: IMulterFile) {
    const { originalname, buffer } = file
    const hash = `${randomSeries(8)}-${+new Date()}`
    const extension = getFileExtension(originalname)
    let webpFileError = null

    try {
      if (BASE_IMAGE_EXTENSIONS.includes(extension.toLowerCase())) {
        const webp = await this.convertImageToWebp(buffer)
        webpFileError = await this.uploadToAzureBlob(hash, 'webp', webp)
      }
      const originFileError = await this.uploadToAzureBlob(hash, extension, buffer)

      const res = {
        name: originalname,
        url: `${AZURE_STORAGE_URL}/${AZURE_STORAGE_CONTAINER_NAME}/${hash}.${extension}`,
      }

      const error = originFileError || webpFileError
      return res
    } catch (err) {
      return err
    }
  }
}
