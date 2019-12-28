import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class PlayerModel {
  @Field(() => ID)
  public readonly _id: string

  @Field()
  public readonly title: string

  @Field()
  public readonly artist: string

  @Field()
  public readonly lrc: string

  @Field()
  public readonly coverUrl: string

  @Field()
  public readonly musicFileUrl: string

  @Field()
  public readonly isPublic: boolean

  @Field()
  public readonly createdAt: string

  @Field()
  public readonly updatedAt: string
}
