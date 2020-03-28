import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { SMSService } from './sms.service'
import { SMSModel } from './models/sms.model'
import { SendSMSRes } from './dtos/sendSMSRes.dto'
import { ValidateSMSRes } from './dtos/validateSMSRes.dto'
import { SendSMSInput } from './dtos/sendSMS.input'
import { ValidateSMSInput } from './dtos/validateSMS.input'
import { GqlAuthGuard } from '../guard/gqlAuth.guard'

@Resolver(() => SMSModel)
export class SMSResolver {
  constructor(private readonly smsService: SMSService) {
    this.smsService = smsService
  }

  @Query(() => [SMSModel])
  @UseGuards(GqlAuthGuard)
  public getAllSMS(): Promise<SMSModel[]> {
    return this.smsService.getAll()
  }

  @Mutation(() => SendSMSRes)
  @UseGuards(GqlAuthGuard)
  public sendSMS(@Args('input') input: SendSMSInput): Promise<SendSMSRes> {
    return this.smsService.sendSMS(input)
  }

  @Mutation(() => ValidateSMSRes)
  @UseGuards(GqlAuthGuard)
  public validateSMS(@Args('input') input: ValidateSMSInput): Promise<ValidateSMSRes> {
    return this.smsService.validateSMSVerificationCode(input)
  }
}
