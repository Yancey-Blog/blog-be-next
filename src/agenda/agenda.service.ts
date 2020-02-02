import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Agenda } from './interfaces/agenda.interface'
import { CreateAgendaInput } from './dtos/create-agenda.input'
import { UpdateAgendaInput } from './dtos/update-agenda.input'

@Injectable()
export class AgendaService {
  constructor(
    @InjectModel('Agenda')
    private readonly agendaModel: Model<Agenda>,
  ) {
    this.agendaModel = agendaModel
  }

  public async findAll() {
    return this.agendaModel.find({}).sort({ updatedAt: -1 })
  }

  public async create(dto: CreateAgendaInput) {
    return this.agendaModel.create(dto)
  }

  public async update(dto: UpdateAgendaInput) {
    const { id, ...rest } = dto
    return this.agendaModel.findByIdAndUpdate(
      id,
      {
        rest,
      },
      { new: true },
    )
  }

  public async deleteOneById(id: string) {
    return this.agendaModel.findByIdAndDelete(id)
  }
}
