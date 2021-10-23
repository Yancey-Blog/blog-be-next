import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql'
import { AgendaService } from './agenda.service'
import { AgendaModel } from './models/agenda.model'
import { CreateAgendaInput } from './dtos/create-agenda.input'
import { UpdateAgendaInput } from './dtos/update-agenda.input'
import { JwtAuthGuard } from '../shared/guard/GraphQLAuth.guard'

@Resolver(() => AgendaModel)
export class AgendaResolver {
  constructor(private readonly agendaService: AgendaService) {
    this.agendaService = agendaService
  }

  @Query(() => [AgendaModel])
  @UseGuards(JwtAuthGuard)
  public async getAgenda() {
    return this.agendaService.findAll()
  }

  @Mutation(() => AgendaModel)
  @UseGuards(JwtAuthGuard)
  public async createAgenda(@Args('input') input: CreateAgendaInput) {
    return this.agendaService.create(input)
  }

  @Mutation(() => AgendaModel)
  @UseGuards(JwtAuthGuard)
  public async updateAgendaById(@Args('input') input: UpdateAgendaInput) {
    return this.agendaService.update(input)
  }

  @Mutation(() => AgendaModel)
  @UseGuards(JwtAuthGuard)
  public async deleteAgendaById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.agendaService.deleteOneById(id)
  }
}
