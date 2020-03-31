import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID, IsEmail } from 'class-validator'

@InputType()
export class CreateTOTPInput {
  @Field(() => ID)
  @IsUUID()
  @IsNotEmpty()
  public readonly userId: string

  @Field()
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string
}
