import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { AgendaService } from './agenda.service'
import { AgendaModel } from './models/agenda.model'
import { CreateAgendaInput } from './dtos/create-agenda.input'
import { UpdateAgendaInput } from './dtos/update-agenda.input'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { GqlAuthGuard } from '../guard/gqlAuth.guard'

@Resolver(() => AgendaModel)
export class AgendaResolver {
  constructor(private readonly agendaService: AgendaService) {
    this.agendaService = agendaService
  }

  @Query(() => [AgendaModel])
  public async getAgenda(): Promise<AgendaModel[]> {
    return this.agendaService.findAll()
  }

  @Mutation(() => AgendaModel)
  @UseGuards(GqlAuthGuard)
  public async createAgenda(@Args('input') input: CreateAgendaInput): Promise<AgendaModel> {
    return this.agendaService.create(input)
  }

  @Mutation(() => AgendaModel)
  @UseGuards(GqlAuthGuard)
  public async updateAgendaById(@Args('input') input: UpdateAgendaInput): Promise<AgendaModel> {
    return this.agendaService.update(input)
  }

  @Mutation(() => AgendaModel)
  @UseGuards(GqlAuthGuard)
  public async deleteAgendaById(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<AgendaModel> {
    return this.agendaService.deleteOneById(id)
  }
}
