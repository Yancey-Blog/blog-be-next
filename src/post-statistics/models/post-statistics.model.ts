import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PostStatisticsModel {
  @Field({ nullable: false })
  public _id: string

  @Field({ nullable: false })
  public postId: string

  @Field({ nullable: false })
  public postName: string

  @Field({ nullable: false })
  public scenes: string

  @Field({ nullable: false })
  public createdAt: Date

  @Field({ nullable: false })
  public updatedAt: Date
}
