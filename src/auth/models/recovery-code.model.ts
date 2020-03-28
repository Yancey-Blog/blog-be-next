import { Field, ObjectType } from '@nestjs/graphql'
import { IsArray } from 'class-validator'

@ObjectType()
export class RecoveryCodeModel {
  @Field()
  @IsArray()
  public readonly recoveryCodes: string[]
}
