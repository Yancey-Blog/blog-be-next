import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class CreateUploaderInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly content: string
}
