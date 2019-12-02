import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty, IsUrl } from 'class-validator'

@InputType()
export class CreateOpenSourceInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly description: string

  @Field()
  @IsUrl()
  @IsNotEmpty()
  public readonly url: string

  @Field()
  @IsUrl()
  @IsNotEmpty()
  public readonly posterUrl: string
}
