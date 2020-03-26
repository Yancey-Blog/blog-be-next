import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsEmail } from 'class-validator'

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly password: string
}
