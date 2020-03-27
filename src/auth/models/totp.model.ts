import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TOTPModel {
  @Field()
  public readonly qrcode: string
}
