import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { IPModel } from '../../auth/models/ip-model'

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  public readonly id: string

  @Field({ nullable: true })
  public readonly isTOTP?: boolean

  @Field({ nullable: true })
  public readonly totpSecret?: string

  @Field({ nullable: true })
  public readonly recoveryCodes?: string[]

  @Field({ nullable: true })
  public readonly password?: string

  @Field({ nullable: true })
  public readonly loginStatistics?: IPModel[]
}
