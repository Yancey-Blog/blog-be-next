import { Field, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumberString } from 'class-validator'

@ObjectType()
export class SendSMSRes {
  @Field()
  @IsNumberString()
  @IsNotEmpty()
  public readonly verificationCode: string
}
