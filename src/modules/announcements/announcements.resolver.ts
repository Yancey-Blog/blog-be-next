import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { ID } from 'type-graphql'
// import { PubSub } from 'apollo-server-express'
// import { RecipesArgs } from './dtos/recipes.args'
import { AnnouncementsService } from './announcements.service'
import { AnnouncementsModel } from './dtos/announcements.model'
import { AnnouncementInput } from './dtos/announcement.input'

// const pubSub = new PubSub();

@Resolver(() => AnnouncementsModel)
export class AnnouncementsResolver {
  constructor(private readonly announcementsService: AnnouncementsService) {
    this.announcementsService = announcementsService
  }

  @Query(() => [AnnouncementsModel], { name: 'announcements' })
  public async getAnnouncements(): Promise<AnnouncementsModel[]> {
    return this.announcementsService.findAll()
  }

  @Query(() => AnnouncementsModel, { name: 'announcement' })
  public async getAnnouncementById(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<AnnouncementsModel> {
    return this.announcementsService.findOneById(id)
  }

  @Mutation(() => AnnouncementsModel, { name: 'createAnnouncement' })
  public async createAnnouncement(
    @Args('input') input: AnnouncementInput,
  ): Promise<AnnouncementsModel> {
    console.log(input)
    return this.announcementsService.create(input)
  }

  @Mutation(() => AnnouncementsModel, { name: 'updateAnnouncement' })
  public async updateAnnouncementById(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('announcement') announcement: string,
  ): Promise<AnnouncementsModel> {
    return this.announcementsService.update(id, announcement)
  }

  @Mutation(() => AnnouncementsModel, { name: 'deleteAnnouncement' })
  public async deleteAnnouncementById(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<AnnouncementsModel> {
    return this.announcementsService.deleteOneById(id)
  }

  @Mutation(() => AnnouncementsModel, { name: 'deleteAnnouncements' })
  public async deleteAnnouncements(
    @Args({ name: 'ids', type: () => [ID] }) ids: string[],
  ): Promise<AnnouncementsModel> {
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
