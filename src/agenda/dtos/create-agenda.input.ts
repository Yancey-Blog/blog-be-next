import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty, IsDate } from 'class-validator'

@InputType()
export class CreateAgendaInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsDate()
  @IsNotEmpty()
  public readonly startDate: Date

  @Field()
  @IsDate()
  public readonly endDate?: Date

  @Field()
  @IsString()
  public readonly rRule?: string

  @Field()
  @IsDate()
  public readonly exDate?: Date
}
