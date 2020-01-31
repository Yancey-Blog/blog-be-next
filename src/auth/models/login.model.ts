import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class LoginModel {
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
  public readonly createdAt: string

  @Field()
  public readonly updatedAt: string
}
