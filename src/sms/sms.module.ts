import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SMSService } from './sms.service'
import { SMSResolver } from './sms.resolver'
import { SMSSchema } from './schemas/sms.schema'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SMS', schema: SMSSchema }]), UsersModule],
  providers: [SMSService, SMSResolver],
})
export class SMSModule {}
