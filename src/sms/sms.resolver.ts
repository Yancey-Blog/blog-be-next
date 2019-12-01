import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { SMSService } from './sms.service'
import { SMSModel } from './dtos/sms.model'
import { SMSRes } from './dtos/smsRes.dto'
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

  @Mutation(() => SMSRes)
  @UseGuards(GqlAuthGuard)
  public sendSMS(@Args('sendSMSInput') sendSMSInput: SendSMSInput): Promise<SMSRes> {
    return this.smsService.sendSMS(sendSMSInput)
  }

  @Mutation(() => SMSRes)
  @UseGuards(GqlAuthGuard)
  public validateSMS(
    @Args('validateSMSInput') validateSMSInput: ValidateSMSInput,
  ): Promise<SMSRes> {
    return this.smsService.validateSMSVerificationCode(validateSMSInput)
  }
}
