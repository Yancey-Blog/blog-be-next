import { Module } from '@nestjs/common'
import { AgendaService } from './agenda.service'
import { AgendaController } from './agenda.controller'

@Module({
  providers: [AgendaService],
  controllers: [AgendaController],
})
export class AgendaModule {}
