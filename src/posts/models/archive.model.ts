/* eslint-disable max-classes-per-file */
import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType()
export class DayModel {
  @Field(() => ID)
  public readonly id: string

  @Field()
  public readonly title: string

  @Field()
  public readonly pv: number

  @Field()
  public readonly createdAt: Date
}

@ObjectType()
export class MonthModel {
  @Field()
  public readonly month: number

  @Field(() => [DayModel])
  public readonly days: DayModel
}

@ObjectType()
export class ArchiveModel {
  @Field()
  public readonly _id: number

  @Field(() => [MonthModel])
  public readonly months: MonthModel
}
