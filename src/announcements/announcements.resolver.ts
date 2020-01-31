import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { ID } from 'type-graphql'
import { AnnouncementsService } from './announcements.service'
import { AnnouncementModel } from './models/announcements.model'
import { CreateAnnouncementInput } from './dtos/create-announcement.input'
import { UpdateAnnouncementInput } from './dtos/update-announcement.input'
import { BatchDeleteModel } from '../database/models/batch-delete.model'

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
  public async createAnnouncement(
    @Args('input') input: CreateAnnouncementInput,
  ): Promise<AnnouncementModel> {
    return this.announcementsService.create(input)
  }

  @Mutation(() => AnnouncementModel)
  public async updateAnnouncementById(
    @Args('input') input: UpdateAnnouncementInput,
  ): Promise<AnnouncementModel> {
    return this.announcementsService.update(input)
  }

  @Mutation(() => AnnouncementModel)
  public async deleteAnnouncementById(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<AnnouncementModel> {
    return this.announcementsService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  public async deleteAnnouncements(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.announcementsService.batchDelete(ids)
  }
}
