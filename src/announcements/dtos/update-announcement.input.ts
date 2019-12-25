import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateAnnouncementInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly id: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly content: string
}
