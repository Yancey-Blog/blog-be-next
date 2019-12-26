import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class YanceyMusicModel {
  @Field(() => ID)
  public readonly _id: string

  @Field()
  public readonly title: string

  @Field()
  public readonly soundCloudUrl: string

  @Field()
  public readonly posterUrl: string

  @Field()
  public readonly releaseDate: string

  @Field()
  public readonly createdAt: string

  @Field()
  public readonly updatedAt: string
}
