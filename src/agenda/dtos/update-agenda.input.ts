import { InputType, Field } from 'type-graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'

@InputType()
export class UpdateAgendaInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string

  @Field({ nullable: true })
  public readonly title?: string

  @Field({ nullable: true })
  public readonly startDate?: string

  @Field({ nullable: true })
  public readonly endDate?: string

  @Field({ nullable: true })
  public readonly allDay?: boolean

  @Field({ nullable: true })
  public readonly notes?: string

  @Field({ nullable: true })
  public readonly rRule?: string

  @Field({ nullable: true })
  public readonly exDate?: string
}
