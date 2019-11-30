import { InputType, Field } from 'type-graphql'
import { IsNotEmpty, IsMobilePhone } from 'class-validator'

@InputType()
export class SendSMSInput {
  @Field()
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  public readonly phoneNumber: string
}
