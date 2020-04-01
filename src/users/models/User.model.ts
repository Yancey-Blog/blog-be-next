import { Field, ID, ObjectType } from '@nestjs/graphql'

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
  public readonly avaterUrl: string

  @Field()
  public readonly phoneNumber: string

  @Field()
  public readonly isTOTP: boolean

  @Field()
  public readonly totpSecret: string

  @Field(() => [String])
  public readonly recoveryCodes: string[]

  @Field()
  public readonly createdAt: Date

  @Field()
  public readonly updatedAt: Date
}
