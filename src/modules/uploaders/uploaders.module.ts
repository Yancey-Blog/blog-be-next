import { Module } from '@nestjs/common'
import { UploadersResolver } from './uploaders.resolver'
import { UploadersService } from './uploaders.service'

@Module({
  controllers: [UploadersResolver],
  providers: [UploadersService],
})
export class UploadersModule {}
