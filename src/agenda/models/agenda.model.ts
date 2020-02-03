import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AgendaModel {
  @Field({ nullable: false })
  public _id: string

  @Field({ nullable: false })
  public title: string

  @Field({ nullable: false })
  public startDate: string

  @Field({ nullable: true })
  public endDate?: string

  @Field({ nullable: true })
  public rRule?: string

  @Field({ nullable: true })
  public exDate?: string

  @Field({ nullable: false })
  public createdAt: string

  @Field({ nullable: false })
  public updatedAt: string
}
