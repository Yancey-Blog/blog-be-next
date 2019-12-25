import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class AnnouncementInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly content: string
}
