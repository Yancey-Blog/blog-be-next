import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { CreateBestAlbumInput } from './create-best-album.input'

@InputType()
export class UpdateBestAlbumInput extends CreateBestAlbumInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string
}
