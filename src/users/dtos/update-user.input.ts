import { InputType, Field } from '@nestjs/graphql'
import { IPModel } from '../../auth/models/ip-model'

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  public readonly id?: string

  @Field({ nullable: true })
  public readonly isTOTP?: boolean

  @Field({ nullable: true })
  public readonly totpSecret?: string

  @Field(() => [String], { nullable: true })
  public readonly recoveryCodes?: string[]

  @Field({ nullable: true })
  public readonly password?: string

  @Field(() => [String], { nullable: true })
  public readonly loginStatistics?: IPModel[]

  @Field({ nullable: true })
  public readonly name?: string

  @Field({ nullable: true })
  public readonly location?: string

  @Field({ nullable: true })
  public readonly organization?: string

  @Field({ nullable: true })
  public readonly website?: string

  @Field({ nullable: true })
  public readonly bio?: string

  @Field({ nullable: true })
  public readonly avatarUrl?: string
}
