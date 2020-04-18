import { Field, ObjectType } from '@nestjs/graphql'
import { PostItemModel } from './post.model'

@ObjectType()
export class TagsModel {
  @Field(() => [String])
  public readonly tags: string[]
}
