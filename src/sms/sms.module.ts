import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SMSService } from './sms.service'
import { SMSResolver } from './sms.resolver'
import { SMSSchema } from './schemas/sms.schema'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SMS', schema: SMSSchema }]), AuthModule],
  providers: [SMSService, SMSResolver],
})
export class SMSModule {}
