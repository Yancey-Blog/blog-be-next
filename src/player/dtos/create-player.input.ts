import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty, IsUrl, IsBoolean } from 'class-validator'

@InputType()
export class CreatePlayerInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly artist: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly lrc: string

  @Field()
  @IsUrl()
  @IsNotEmpty()
  public readonly coverUrl: string

  @Field()
  @IsUrl()
  @IsNotEmpty()
  public readonly musicFileUrl: string

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  public readonly isPublic: boolean
}
