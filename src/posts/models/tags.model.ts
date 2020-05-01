import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TagsModel {
  @Field(() => [String])
  public readonly tags: string[]
}
