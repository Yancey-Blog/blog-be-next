import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsMobilePhone, IsNumberString, Length, IsString } from 'class-validator'

@InputType()
export class ValidateSMSInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly phoneNumber: string

  @Field()
  @Length(6)
  @IsNumberString()
  @IsNotEmpty()
  public readonly smsCode: string
}
