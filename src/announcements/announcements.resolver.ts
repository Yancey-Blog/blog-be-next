import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver, Mutation, ID } from '@nestjs/graphql'
import { AnnouncementsService } from './announcements.service'
import { AnnouncementModel } from './models/announcements.model'
import { CreateAnnouncementInput } from './dtos/create-announcement.input'
import { UpdateAnnouncementInput } from './dtos/update-announcement.input'
import { ExchangePositionInput } from '../shared/interfaces/exchange-position.input'
import { BatchDeleteModel } from '../database/models/batch-delete.model'
import { JwtAuthGuard } from '../shared/guard/GraphQLAuth.guard'

@Resolver(() => AnnouncementModel)
export class AnnouncementsResolver {
  constructor(private readonly announcementsService: AnnouncementsService) {
    this.announcementsService = announcementsService
  }

  @Query(() => [AnnouncementModel])
  public async getAnnouncements(): Promise<AnnouncementModel[]> {
    return this.announcementsService.findAll()
  }

  @Query(() => AnnouncementModel)
  public async getAnnouncementById(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<AnnouncementModel> {
    return this.announcementsService.findOneById(id)
  }

  @Mutation(() => AnnouncementModel)
  @UseGuards(JwtAuthGuard)
  public async createAnnouncement(
    @Args('input') input: CreateAnnouncementInput,
  ): Promise<AnnouncementModel> {
    return this.announcementsService.create(input)
  }

  @Mutation(() => AnnouncementModel)
  @UseGuards(JwtAuthGuard)
  public async updateAnnouncementById(
    @Args('input') input: UpdateAnnouncementInput,
  ): Promise<AnnouncementModel> {
    return this.announcementsService.update(input)
  }

  @Mutation(() => [AnnouncementModel])
  @UseGuards(JwtAuthGuard)
  public async exchangePositionAnnouncement(
    @Args('input') input: ExchangePositionInput,
  ): Promise<AnnouncementModel[]> {
    return this.announcementsService.exchangePosition(input)
  }

  @Mutation(() => AnnouncementModel)
  @UseGuards(JwtAuthGuard)
  public async deleteAnnouncementById(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<AnnouncementModel> {
    return this.announcementsService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  @UseGuards(JwtAuthGuard)
  public async deleteAnnouncements(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.announcementsService.batchDelete(ids)
  }
}
