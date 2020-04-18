import { Field, ObjectType } from '@nestjs/graphql'
import { PostItemModel } from './post.model'

@ObjectType()
export class PostModel {
  @Field()
  public readonly total: number

  @Field()
  public readonly page: number

  @Field()
  public readonly pageSize: number

  @Field(() => [PostItemModel])
  public readonly items: PostItemModel[]
}
