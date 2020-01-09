import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AnnouncementModel {
  @Field({ nullable: false })
  public _id: string

  @Field({ nullable: false })
  public content: string

  @Field({ nullable: false })
  public createdAt: string

  @Field({ nullable: false })
  public updatedAt: string
}
