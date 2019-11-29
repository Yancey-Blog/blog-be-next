import { Controller, Post, Body, ValidationPipe } from '@nestjs/common'
import { SMSService } from './sms.service'
import { ValidateSMSDto } from './dtos/validateSMS.dto'

@Controller('sms')
export class SMSResolver {
  constructor(private readonly smsService: SMSService) {
    this.smsService = smsService
  }

  @Post('/send')
  public sendSMS(@Body('phoneNumber') phoneNumber: string) {
    return this.smsService.sendSMS(phoneNumber)
  }

  @Post('/validate')
  public validateSMS(@Body(new ValidationPipe()) validateSMSDto: ValidateSMSDto) {
    return this.smsService.validateSMSVerificationCode(validateSMSDto)
  }
}
