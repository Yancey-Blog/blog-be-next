import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty, IsDate, IsUUID } from 'class-validator'

@InputType()
export class UpdateAgendaInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string

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
