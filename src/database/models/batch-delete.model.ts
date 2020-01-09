import { Field, ObjectType, ID } from 'type-graphql'

@ObjectType()
export class BatchDeleteModel {
  @Field({ nullable: true })
  public readonly ok?: number

  @Field({ nullable: true })
  public readonly n?: number

  @Field({ nullable: true })
  public readonly deletedCount?: number

  @Field(() => ID)
  public readonly ids: string[]
}
