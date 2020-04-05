import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsUrl, IsDate, IsArray } from 'class-validator'

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  public readonly posterUrl: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly title: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly summary: string

  @Field()
  @IsString()
  @IsNotEmpty()
  public readonly content: string

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty()
  public readonly tags: string[]

  @Field()
  @IsDate()
  @IsNotEmpty()
  public readonly lastModifiedDate: Date

  @Field({ nullable: true })
  public readonly isPublic?: boolean
}
