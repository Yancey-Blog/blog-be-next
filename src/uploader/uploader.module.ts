import { Module } from '@nestjs/common'
import { UploaderResolver } from './uploader.resolver'
import { UploaderService } from './uploader.service'

@Module({
  controllers: [UploaderResolver],
  providers: [UploaderService],
})
export class UploaderModule {}
