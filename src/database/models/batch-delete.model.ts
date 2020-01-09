import { Field, ObjectType, ID } from 'type-graphql'

@ObjectType()
export class BatchDeleteModel {
  @Field({ nullable: true })
  public readonly ok?: number

  @Field({ nullable: true })
  public readonly n?: number

  @Field({ nullable: true })
  public readonly deletedCount?: number

  // FIXME: ids 不是可选参数
  @Field(() => ID)
  public readonly ids?: string[]
}
