import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

@InputType()
export class PaginationInput {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly page: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly pageSize: number
}
