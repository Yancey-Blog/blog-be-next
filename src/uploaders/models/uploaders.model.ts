import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'The response of Azure uploader.' })
export class UploaderModel {
  @Field({ nullable: false })
  public url: string

  @Field({ nullable: false })
  public name: string
}
