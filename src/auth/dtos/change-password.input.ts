import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly oldPassword: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly newPassword: string
}
