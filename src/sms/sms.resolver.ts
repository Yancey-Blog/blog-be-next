import { UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { Args, Resolver, Mutation } from '@nestjs/graphql'
import { SMSService } from './sms.service'
import { SMSModel } from './models/sms.model'
import { SendSMSRes } from './dtos/sendSMSRes.dto'
import { ValidateSMSInput } from './dtos/validateSMS.input'
import { GqlAuthGuard } from '../shared/guard/gqlAuth.guard'
import { UserModel } from '../users/models/user.model'
import { ReqDecorator } from '../shared/decorators/req.decorator'

@Resolver(() => SMSModel)
export class SMSResolver {
  constructor(private readonly smsService: SMSService) {
    this.smsService = smsService
  }

  @Mutation(() => SendSMSRes)
  @UseGuards(GqlAuthGuard)
  public sendSMS(
    @Args({ name: 'phoneNumber', type: () => String }) phoneNumber: string,
  ): Promise<SendSMSRes> {
    return this.smsService.sendSMS(phoneNumber)
  }

  @Mutation(() => UserModel)
  @UseGuards(GqlAuthGuard)
  public validateSMS(@Args('input') input: ValidateSMSInput, @ReqDecorator() req: Request) {
    return this.smsService.validateSMSVerificationCode(input, req.headers.authorization)
  }
}
