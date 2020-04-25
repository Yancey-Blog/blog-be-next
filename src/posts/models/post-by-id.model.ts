import { Field, ObjectType } from '@nestjs/graphql'
import { PostItemModel } from './post.model'

@ObjectType()
export class PostByIdModel extends PostItemModel {
  @Field(() => PostItemModel, { nullable: true })
  public readonly prev: PostItemModel | null

  @Field(() => PostItemModel, { nullable: true })
  public readonly next: PostItemModel | null
}
