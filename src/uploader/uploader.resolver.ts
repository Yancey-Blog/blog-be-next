import { Post, Controller, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { JwtAuthGuard } from '../shared/guard/HTTPAuth.guard'
import { UploaderService } from './uploader.service'

@Controller()
export class UploaderResolver {
  constructor(private readonly uploaderService: UploaderService) {
    this.uploaderService = uploaderService
  }

  @Post('uploads')
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { limits: { fieldSize: 10 * 1024 * 1024 } }))
  public uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploaderService.uploadFile(file)
  }
}
