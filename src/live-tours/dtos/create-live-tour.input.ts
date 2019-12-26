import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class CreateLiveTourInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly posterUrl: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly showTime: string
}
