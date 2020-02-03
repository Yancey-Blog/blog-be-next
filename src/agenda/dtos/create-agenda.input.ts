import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty, IsDateString } from 'class-validator'

@InputType()
export class CreateAgendaInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsDateString()
  @IsNotEmpty()
  public readonly startDate: string

  @Field({ nullable: true })
  @IsDateString()
  public readonly endDate?: string

  @Field({ nullable: true })
  @IsString()
  public readonly rRule?: string

  @Field({ nullable: true })
  @IsDateString()
  public readonly exDate?: string
}
