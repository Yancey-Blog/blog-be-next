import { Field, ID, ObjectType } from '@nestjs/graphql'

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
  public readonly releaseDate: Date

  @Field()
  public readonly createdAt: Date

  @Field()
  public readonly updatedAt: Date
}
