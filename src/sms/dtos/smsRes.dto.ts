import { Field, ObjectType } from 'type-graphql'
import { IsNotEmpty, IsBoolean, IsString } from 'class-validator'

@ObjectType()
export class SMSRes {
  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly success: boolean

  // 对于可选字段, 可加上 nullable: true
  @Field({ nullable: true })
  @IsString()
  public readonly message?: string
}
