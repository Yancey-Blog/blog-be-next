import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GlobalSettingModel {
  @Field(() => ID)
  public readonly _id: string

  @Field(() => ID)
  public readonly releasePostId: string

  @Field(() => ID)
  public readonly cvPostId: string

  @Field()
  public readonly isGrayTheme: boolean

  @Field()
  public readonly createdAt: Date

  @Field()
  public readonly updatedAt: Date
}
