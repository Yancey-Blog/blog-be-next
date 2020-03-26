import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsMobilePhone } from 'class-validator'

@InputType()
export class SendSMSInput {
  @Field()
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  public readonly phoneNumber: string
}
