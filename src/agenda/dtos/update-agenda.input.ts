import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty, IsDateString, IsUUID } from 'class-validator'

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
  @IsDateString()
  @IsNotEmpty()
  public readonly startDate: string

  @Field()
  @IsDateString()
  public readonly endDate?: string

  @Field()
  @IsString()
  public readonly rRule?: string

  @Field()
  @IsDateString()
  public readonly exDate?: string
}
