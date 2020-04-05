import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator'

@InputType()
export class ExchangePositionInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string

  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly exchangedId: string

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly position: number

  @Field()
  @IsNumber()
  @IsNotEmpty()
  public readonly exchangedPosition: number
}
