import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SMSModel {
  @Field({ nullable: false })
  public _id: string

  @Field({ nullable: false })
  public phoneNumber: string

  @Field({ nullable: false })
  public verificationCode: string

  @Field({ nullable: false })
  public createdAt: Date

  @Field({ nullable: false })
  public updatedAt: Date
}
