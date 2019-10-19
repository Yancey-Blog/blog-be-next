import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class MottosModel {
  @Field({ nullable: false })
  _id: string

  @Field({ nullable: false })
  motto: string

  @Field({ nullable: false })
  created_at: string

  @Field({ nullable: false })
  updated_at: string
}
