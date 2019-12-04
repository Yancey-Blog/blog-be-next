import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class OpenSourceModel {
  @Field(() => ID)
  public readonly _id: string

  @Field()
  public readonly title: string

  @Field()
  public readonly description: string

  @Field()
  public readonly url: string

  @Field()
  public readonly posterUrl: string

  @Field()
  public readonly createdAt: string

  @Field()
  public readonly updatedAt: string
}
