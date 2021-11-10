import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType({ description: 'The input type for creating an announcement.' })
export class CreateAnnouncementInput {
  @Field({
    description: 'Announcement content.',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  public readonly content: string
}
