import { InputType, Field } from 'type-graphql'
import { IsUUID, IsNotEmpty } from 'class-validator'
import { CreatePlayerInput } from './create-player.input'

@InputType()
export class UpdatePlayerInput extends CreatePlayerInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public readonly id: string
}
