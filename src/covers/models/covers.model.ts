import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CoverModel {
  @Field(() => ID)
  public readonly _id: string

  @Field()
  public readonly title: string

  @Field()
  public readonly coverUrl: string

  @Field()
  public readonly weight: number

  @Field()
  public readonly isPublic: boolean

  @Field()
  public readonly createdAt: Date

  @Field()
  public readonly updatedAt: Date
}
