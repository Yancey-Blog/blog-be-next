import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AgendaModel {
  @Field({ nullable: false })
  public _id: string

  @Field({ nullable: false })
  public title: string

  @Field({ nullable: false })
  public startDate: Date

  @Field({ nullable: true })
  public endDate?: Date

  @Field()
  public allDay: boolean

  @Field()
  public notes: string

  @Field({ nullable: true })
  public rRule?: string

  @Field({ nullable: true })
  public exDate?: Date

  @Field({ nullable: false })
  public createdAt: Date

  @Field({ nullable: false })
  public updatedAt: Date
}
