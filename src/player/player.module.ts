import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PlayerSchema } from './schemas/player.schema'
import { PlayerResolver } from './player.resolver'
import { PlayerService } from './player.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }])],
  providers: [PlayerResolver, PlayerService],
})
export class PlayerModule {}
