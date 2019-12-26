import { InputType, Field } from 'type-graphql'
import { IsString, IsNotEmpty, IsUrl } from 'class-validator'

@InputType()
export class CreateYanceyMusicInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsUrl()
  @IsNotEmpty()
  public readonly soundCloudUrl: string

  @Field()
  @IsUrl()
  @IsNotEmpty()
  public readonly posterUrl: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly releaseDate: string
}
