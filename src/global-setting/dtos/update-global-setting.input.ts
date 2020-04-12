import { InputType, Field } from '@nestjs/graphql'
import { IsUUID, IsNotEmpty, IsBoolean } from 'class-validator'

@InputType()
export class UpdateGlobalSettingInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string

  @Field({ nullable: true })
  public readonly releasePostId?: string

  @Field({ nullable: true })
  public readonly cvPostId?: string

  @Field({ nullable: true })
  public readonly isGrayTheme?: boolean
}
