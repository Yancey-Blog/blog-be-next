import { Module } from '@nestjs/common'
import { UploadersResolver } from './uploaders.resolver'
import { UploadersService } from './uploaders.service'

@Module({
  providers: [UploadersService, UploadersResolver],
})
export class UploadersModule {}
