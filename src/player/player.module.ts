import { Module } from '@nestjs/common'
import { PlayerResolver } from './player.resolver'
import { PlayerService } from './player.service'

@Module({
  controllers: [PlayerResolver],
  providers: [PlayerService],
})
export class PlayerModule {}
