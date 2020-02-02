import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AgendaResolver } from './agenda.resolver'
import { AgendaService } from './agenda.service'
import { AgendaSchema } from './schemas/agenda.schemas'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Agenda', schema: AgendaSchema }])],
  providers: [AgendaService, AgendaResolver],
})
export class AgendaModule {}
