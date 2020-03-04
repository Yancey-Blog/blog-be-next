import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty, IsUrl, IsDate } from 'class-validator'

@InputType()
export class CreateBestAlbumInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly artist: string

  @Field()
  @IsUrl()
  @IsNotEmpty()
  public readonly coverUrl: string

  @Field()
  @IsUrl()
  @IsNotEmpty()
  public readonly mvUrl: string

  @Field()
  @IsDate()
  @IsNotEmpty()
  public readonly releaseDate: Date
}
