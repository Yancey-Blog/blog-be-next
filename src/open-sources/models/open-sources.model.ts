import { Field, ID, ObjectType } from '@nestjs/graphql'

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
  public readonly createdAt: Date

  @Field()
  public readonly updatedAt: Date
}
