import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { ID } from 'type-graphql'
// import { PubSub } from 'apollo-server-express'
// import { RecipesArgs } from './dtos/recipes.args'
import { AnnouncementsService } from './announcements.service'
import { AnnouncementsModel } from './models/announcements.model'
import { CreateAnnouncementInput } from './dtos/create-announcement.input'
import { UpdateAnnouncementInput } from './dtos/update-announcement.input'
import { BatchDeleteModel } from '../database/models/batch-delete.model'

// const pubSub = new PubSub();

@Resolver(() => AnnouncementsModel)
export class AnnouncementsResolver {
  constructor(private readonly announcementsService: AnnouncementsService) {
    this.announcementsService = announcementsService
  }

  @Query(() => [AnnouncementsModel])
  public async getAnnouncements(): Promise<AnnouncementsModel[]> {
    return this.announcementsService.findAll()
  }

  @Query(() => AnnouncementsModel)
  public async getAnnouncementById(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<AnnouncementsModel> {
    return this.announcementsService.findOneById(id)
  }

  @Mutation(() => AnnouncementsModel)
  public async createAnnouncement(
    @Args('input') input: CreateAnnouncementInput,
  ): Promise<AnnouncementsModel> {
    return this.announcementsService.create(input)
  }

  @Mutation(() => AnnouncementsModel)
  public async updateAnnouncementById(
    @Args('input') input: UpdateAnnouncementInput,
  ): Promise<AnnouncementsModel> {
    return this.announcementsService.update(input)
  }

  @Mutation(() => AnnouncementsModel)
  public async deleteAnnouncementById(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<AnnouncementsModel> {
    return this.announcementsService.deleteOneById(id)
  }

  @Mutation(() => BatchDeleteModel)
  public async deleteAnnouncements(@Args({ name: 'ids', type: () => [ID] }) ids: string[]) {
    return this.announcementsService.batchDelete(ids)
  }

  // @Mutation(returns => AnnouncementsModel)
  // async addRecipe(
  //   @Args('newRecipeData') newRecipeData: NewRecipeInput,
  // ): Promise<AnnouncementsModel> {
  //   const recipe = await this.announcementsService.create(newRecipeData);
  //   pubSub.publish('recipeAdded', { recipeAdded: recipe });
  //   return recipe;
  // }

  // @Subscription(returns => AnnouncementsModel)
  // recipeAdded() {
  //   return pubSub.asyncIterator('recipeAdded');
  // }
}
