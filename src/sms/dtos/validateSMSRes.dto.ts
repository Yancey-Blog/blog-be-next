import { Field, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, IsBoolean } from 'class-validator'

@ObjectType()
export class ValidateSMSRes {
  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly success: boolean
}
