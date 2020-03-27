import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID, IsNumberString, Length } from 'class-validator'

@InputType()
export class ValidateTOTPInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly userId: string

  @Field()
  @IsNumberString()
  @IsNotEmpty()
  @Length(6)
  public readonly token: string
}
