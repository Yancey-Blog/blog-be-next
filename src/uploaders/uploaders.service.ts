import { Injectable } from '@nestjs/common'
import { FileUpload } from 'graphql-upload'
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'
import { randomSeries, getFileExtension } from 'yancey-js-util'
import sharp from 'sharp'
import { ConfigService } from '../config/config.service'
import { AZURE_STORAGE_URL, AZURE_STORAGE_CONTAINER_NAME } from '../shared/constants'

@Injectable()
export class UploadersService {
  private readonly containerClient: ContainerClient

  constructor(configService: ConfigService) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      configService.getAzureStorageConnectionString(),
    )

    this.containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME)
  }

  private async convertImageToWebp(image: Buffer) {
    const buffer = await sharp(image).webp({ quality: 90 }).toBuffer()
    return buffer
  }

  private async convertImageToAVIF(image: Buffer) {
    const buffer = await sharp(image).avif({ quality: 80 }).toBuffer()
    return buffer
  }

  private async upload(fileName: string, extension: string, buffer: Buffer) {
    const blockBlobClient = this.containerClient.getBlockBlobClient(`${fileName}.${extension}`)
    const { errorCode } = await blockBlobClient.upload(buffer, Buffer.byteLength(buffer))
    return errorCode
  }

  public async uploadFile(file: FileUpload) {
    const { createReadStream, filename } = file
    const rs = createReadStream()
    const buffers = []

    return new Promise((resolve, reject) => {
      rs.addListener('data', (data) => {
        buffers.push(data)
      })

      rs.addListener('end', async () => {
        const hash = `${randomSeries(8)}-${+new Date()}`
        const buffer = Buffer.concat(buffers)
        const extension = getFileExtension(filename)
        const images = ['jpeg', 'jpg', 'png', 'gif']
        let webpFileError = null
        let avifFileError = null

        if (images.includes(extension.toLowerCase())) {
          const webp = await this.convertImageToWebp(buffer)
          const avif = await this.convertImageToAVIF(buffer)
          webpFileError = await this.upload(hash, 'webp', webp)
          avifFileError = await this.upload(hash, 'avif', avif)
        }

        const originFileError = await this.upload(hash, extension, buffer)

        const res = {
          name: filename,
          url: `${AZURE_STORAGE_URL}/${AZURE_STORAGE_CONTAINER_NAME}/${hash}.${extension}`,
        }

        const error = originFileError || webpFileError || avifFileError
        if (error) {
          reject(error)
        } else {
          // @ts-ignore
          resolve(res)
        }
      })

      rs.addListener('error', (err) => {
        reject(err)
      })
    })
  }
}
