import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GlobalSettingSchema } from './schemas/global-setting.schema'
import { GlobalSettingResolver } from './global-setting.resolver'
import { GlobalSettingService } from './global-setting.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'GlobalSetting', schema: GlobalSettingSchema }])],
  providers: [GlobalSettingResolver, GlobalSettingService],
})
export class GlobalSettingModule {}
