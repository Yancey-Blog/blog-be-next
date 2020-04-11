import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class CreatePostStatisticsInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly postId: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly postName: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly scenes: string
}
