import { Post, Controller, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '../shared/guard/HTTPAuth.guard'
import { UploaderService } from './uploader.service'
import { IMulterFile } from './interfaces/multer.interface'

@Controller('uploads')
export class UploaderResolver {
  constructor(private readonly uploaderService: UploaderService) {
    this.uploaderService = uploaderService
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { limits: { fieldSize: 10 * 1024 * 1024 } }))
  public uploadFile(@UploadedFile() file: IMulterFile) {
    return this.uploaderService.uploadFile(file)
  }
}
