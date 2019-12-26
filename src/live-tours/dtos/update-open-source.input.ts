import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty } from 'class-validator'
import { CreateLiveTourInput } from './create-open-source.input'

@InputType()
export class UpdateLiveTourInput extends CreateLiveTourInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly id: string
}
