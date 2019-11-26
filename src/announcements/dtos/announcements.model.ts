import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AnnouncementsModel {
  @Field({ nullable: false })
  public _id: string

  @Field({ nullable: false })
  public announcement: string

  @Field({ nullable: false })
  public created_at: string

  @Field({ nullable: false })
  public updated_at: string
}
