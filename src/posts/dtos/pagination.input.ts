import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber } from 'class-validator'

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

  @Field({ nullable: true })
  public readonly title?: string
}
