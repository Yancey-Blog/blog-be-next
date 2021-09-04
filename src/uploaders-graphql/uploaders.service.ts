import { createWriteStream } from 'fs'
import { Injectable } from '@nestjs/common'
import { GraphQLUpload, FileUpload } from 'graphql-upload'
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'
import { ConfigService } from '../config/config.service'
import { AZURE_STORAGE_CONTAINER_NAME } from '../shared/constants'

@Injectable()
export class UploadersService {
  private readonly containerClient: ContainerClient

  constructor(configService: ConfigService) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      configService.getAzureStorageConnectionString(),
    )

    this.containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME)
  }

  public async upload(file: FileUpload) {
    const { filename, createReadStream } = file
    console.log(file)
    const blockBlobClient = this.containerClient.getBlockBlobClient(filename)
    // const uploadBlobResponse = await blockBlobClient.upload(buffer, size)

    return true
  }
}
