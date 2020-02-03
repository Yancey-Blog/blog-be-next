import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { AgendaService } from './agenda.service'
import { AgendaModel } from './models/agenda.model'
import { CreateAgendaInput } from './dtos/create-agenda.input'
import { UpdateAgendaInput } from './dtos/update-agenda.input'
import { GqlAuthGuard } from '../guard/gqlAuth.guard'

@Resolver(() => AgendaModel)
export class AgendaResolver {
  constructor(private readonly agendaService: AgendaService) {
    this.agendaService = agendaService
  }

  @Query(() => [AgendaModel])
  @UseGuards(GqlAuthGuard)
  public async getAgenda() {
    return this.agendaService.findAll()
  }

  @Mutation(() => AgendaModel)
  // @UseGuards(GqlAuthGuard)
  public async createAgenda(@Args('input') input: CreateAgendaInput) {
    return this.agendaService.create(input)
  }

  @Mutation(() => AgendaModel)
  // @UseGuards(GqlAuthGuard)
  public async updateAgendaById(@Args('input') input: UpdateAgendaInput) {
    return this.agendaService.update(input)
  }

  @Mutation(() => AgendaModel)
  // @UseGuards(GqlAuthGuard)
  public async deleteAgendaById(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.agendaService.deleteOneById(id)
  }
}
