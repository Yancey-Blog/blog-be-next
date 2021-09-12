import { Injectable } from '@nestjs/common'
import { FileUpload } from 'graphql-upload'
import { ForbiddenError } from 'apollo-server-express'
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'
import { randomSeries, getFileExtension } from 'yancey-js-util'
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

  public async uploadFile(file: FileUpload) {
    const { createReadStream, filename } = file
    const rs = createReadStream()
    const buffers = []

    return new Promise((resolve, reject) => {
      rs.addListener('data', (data) => {
        buffers.push(data)
      })

      rs.addListener('end', async () => {
        const blobName = `${randomSeries(8)}-${+new Date()}.${getFileExtension(filename)}`
        const buffer = Buffer.concat(buffers)
        const blockBlobClient = this.containerClient.getBlockBlobClient(blobName)
        const { errorCode } = await blockBlobClient.upload(buffer, Buffer.byteLength(buffer))

        const res = {
          name: filename,
          url: `${AZURE_STORAGE_URL}/${AZURE_STORAGE_CONTAINER_NAME}/${blobName}`,
        }

        if (errorCode) {
          reject(errorCode)
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
