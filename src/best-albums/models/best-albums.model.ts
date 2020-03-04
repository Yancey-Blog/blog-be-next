import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class BestAlbumModel {
  @Field(() => ID)
  public readonly _id: string

  @Field()
  public readonly title: string

  @Field()
  public readonly artist: string

  @Field()
  public readonly coverUrl: string

  @Field()
  public readonly mvUrl: string

  @Field()
  public readonly releaseDate: Date

  @Field()
  public readonly createdAt: Date

  @Field()
  public readonly updatedAt: Date
}
