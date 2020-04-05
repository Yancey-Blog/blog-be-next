import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class CreateMottoInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly content: string
}
