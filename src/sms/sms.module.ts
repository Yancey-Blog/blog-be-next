import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SMSService } from './sms.service'
import { SMSResolver } from './sms.resolver'
import { SMSSchema } from './sms.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SMS', schema: SMSSchema }])],
  providers: [SMSService, SMSResolver],
  controllers: [SMSResolver], // TODO: delete me!
})
export class SMSModule {}
