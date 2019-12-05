import { Field, ObjectType } from 'type-graphql'
import { IsNotEmpty, IsNumberString } from 'class-validator'

@ObjectType()
export class SendSMSRes {
  @Field()
  @IsNumberString()
  @IsNotEmpty()
  public readonly verificationCode: string
}
