import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, NotContains } from 'class-validator'

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string

  @Field()
  @IsString()
  @NotContains('@')
  @IsNotEmpty()
  public readonly username: string

  @Field()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  public readonly password: string
}
