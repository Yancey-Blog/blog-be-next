import { InputType, Field } from '@nestjs/graphql'
import { IsUUID, IsNotEmpty, IsString, IsUrl, IsBoolean } from 'class-validator'
import { CreatePlayerInput } from './create-player.input'

@InputType()
export class UpdatePlayerInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string

  @Field({ nullable: true })
  public readonly title?: string

  @Field({ nullable: true })
  public readonly artist?: string

  @Field({ nullable: true })
  public readonly lrc?: string

  @Field({ nullable: true })
  public readonly coverUrl?: string

  @Field({ nullable: true })
  public readonly musicFileUrl?: string

  @Field({ nullable: true })
  @IsBoolean()
  public readonly isPublic?: boolean
}
