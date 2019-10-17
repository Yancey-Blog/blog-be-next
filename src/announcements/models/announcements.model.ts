import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AnnouncementsModel {
  @Field({ nullable: false })
  _id: string

  @Field({ nullable: false })
  announcement: string

  @Field({ nullable: false })
  created_at: string

  @Field({ nullable: false })
  updated_at: string
}
