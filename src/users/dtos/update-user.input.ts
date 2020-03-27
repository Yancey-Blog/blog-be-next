import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  public readonly id: string

  @Field({ nullable: true })
  public readonly isTOTP?: string

  @Field({ nullable: true })
  public readonly twoFactorSecret?: string

  @Field({ nullable: true })
  public readonly oldPassword?: string

  @Field({ nullable: true })
  public readonly newPassword?: string
}
