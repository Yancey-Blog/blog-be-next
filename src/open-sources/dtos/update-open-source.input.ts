import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator'
import { CreateOpenSourceInput } from './create-open-source.input'

@InputType()
export class UpdateOpenSourceInput extends CreateOpenSourceInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly id: string
}
