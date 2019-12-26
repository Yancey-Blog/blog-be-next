import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class CreateAnnouncementInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly content: string
}
