import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'

@InputType()
export class ValidateTOTPInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly userId: string

  @Field()
  @IsNotEmpty()
  public readonly token: string
}
