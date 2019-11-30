import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { SMSService } from './sms.service'
import { SMSModel } from './dtos/sms.model'
import { SMSRes } from './dtos/smsRes.dto'
import { SendSMSInput } from './dtos/sendSMS.input'
import { ValidateSMSInput } from './dtos/validateSMS.input'

@Resolver(() => SMSModel)
export class SMSResolver {
  constructor(private readonly smsService: SMSService) {
    this.smsService = smsService
  }

  @UseGuards(AuthGuard())
  @Query(() => [SMSModel], { name: 'sms' })
  public getSMSs(): Promise<SMSModel[]> {
    return this.smsService.getAll()
  }

  @UseGuards(AuthGuard())
  @Mutation(() => SMSRes, { name: 'sendSMS' })
  public sendSMS(@Args('input') input: SendSMSInput): Promise<SMSRes> {
    return this.smsService.sendSMS(input)
  }

  @UseGuards(AuthGuard())
  @Mutation(() => SMSRes, { name: 'validateSMS' })
  public validateSMS(@Args('input') input: ValidateSMSInput): Promise<SMSRes> {
    return this.smsService.validateSMSVerificationCode(input)
  }
}
