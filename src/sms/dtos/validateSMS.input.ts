import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsMobilePhone, IsNumberString } from 'class-validator'

@InputType()
export class ValidateSMSInput {
  @Field()
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  public readonly phoneNumber: string

  @Field()
  @IsNumberString()
  @IsNotEmpty()
  public readonly verificationCode: string
}
