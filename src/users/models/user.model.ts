import { Field, ID, ObjectType } from '@nestjs/graphql'
import { IPModel } from '../../auth/models/ip-model'

@ObjectType()
export class UserModel {
  @Field(() => ID)
  public readonly _id: string

  @Field()
  public readonly authorization: string

  @Field()
  public readonly username: string

  @Field()
  public readonly email: string

  @Field()
  public readonly password: string

  @Field()
  public readonly role: number

  @Field()
  public readonly name: string

  @Field()
  public readonly location: string

  @Field()
  public readonly organization: string

  @Field()
  public readonly website: string

  @Field()
  public readonly bio: string

  @Field()
  public readonly avatarUrl: string

  @Field()
  public readonly isTOTP: boolean

  @Field()
  public readonly totpSecret: string

  @Field(() => [String])
  public readonly recoveryCodes: string[]

  @Field(() => [IPModel])
  public readonly loginStatistics: IPModel[]

  @Field()
  public readonly createdAt: Date

  @Field()
  public readonly updatedAt: Date
}
