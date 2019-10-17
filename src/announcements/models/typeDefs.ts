import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class TypeDefs {
  @Field()
  _id: string

  @Field()
  announcement: string

  @Field()
  created_at: string

  @Field()
  updated_at: string
}
