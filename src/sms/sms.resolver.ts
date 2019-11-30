import { Controller, Post, Body, ValidationPipe } from '@nestjs/common'
import { SMSService } from './sms.service'
import { ValidateSMSDto } from './dtos/validateSMS.dto'
import { SMSRes } from './interfaces/sms.interface'

@Controller('sms')
export class SMSResolver {
  constructor(private readonly smsService: SMSService) {
    this.smsService = smsService
  }

  @Post('/send')
  public sendSMS(@Body('phoneNumber') phoneNumber: string): Promise<SMSRes> {
    return this.smsService.sendSMS(phoneNumber)
  }

  @Post('/validate')
  public validateSMS(@Body(new ValidationPipe()) validateSMSDto: ValidateSMSDto): Promise<SMSRes> {
    return this.smsService.validateSMSVerificationCode(validateSMSDto)
  }
}
