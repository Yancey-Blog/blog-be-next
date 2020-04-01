import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID, IsString } from 'class-validator'

@InputType()
export class ValidateTOTPInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly code: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly key: string
}
