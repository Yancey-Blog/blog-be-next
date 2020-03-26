import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsUUID } from 'class-validator'

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly oldPassword: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly newPassword: string
}
