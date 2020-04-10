import { InputType, Field } from '@nestjs/graphql'
import { IsUUID, IsNotEmpty, IsBoolean } from 'class-validator'

@InputType()
export class UpdateCoverInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string

  @Field({ nullable: true })
  public readonly title?: string

  @Field({ nullable: true })
  public readonly coverUrl?: string

  @Field({ nullable: true })
  @IsBoolean()
  public readonly isPublic?: boolean
}
