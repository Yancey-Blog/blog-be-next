import { Field, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumberString, IsBoolean } from 'class-validator'

@ObjectType()
export class SendSMSRes {
  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly success: boolean
}
