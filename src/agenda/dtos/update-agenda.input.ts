import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty, IsDateString, IsUUID, IsBoolean } from 'class-validator'

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

  @Field({ nullable: true })
  public readonly endDate?: string

  @Field()
  @IsBoolean()
  public readonly allDay: boolean

  @Field()
  @IsString()
  public readonly notes: string

  @Field({ nullable: true })
  public readonly rRule?: string

  @Field({ nullable: true })
  public readonly exDate?: string
}
