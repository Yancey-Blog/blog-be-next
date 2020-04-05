import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MottoModel {
  @Field({ nullable: false })
  public _id: string

  @Field({ nullable: false })
  public content: string

  @Field({ nullable: false })
  public position: number

  @Field({ nullable: false })
  public createdAt: Date

  @Field({ nullable: false })
  public updatedAt: Date
}
