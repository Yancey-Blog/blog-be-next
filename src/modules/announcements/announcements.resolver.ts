import { Args, Query, Resolver, Mutation } from '@nestjs/graphql'
import { ID } from 'type-graphql'
// import { PubSub } from 'apollo-server-express'
// import { NewRecipeInput } from './dto/new-recipe.input'
// import { RecipesArgs } from './dtos/recipes.args'
import { AnnouncementsService } from './announcements.service'
import { AnnouncementsModel } from './models/announcements.model'

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

  @Mutation(() => AnnouncementsModel, { name: 'updateAnnouncement' })
  public async updateAnnouncementById(
    @Args({ name: 'id', type: () => ID }) id: string,
    @Args('announcement') announcement: string,
  ): Promise<AnnouncementsModel> {
    return this.announcementsService.update(id, announcement)
  }

  // @Mutation(returns => AnnouncementsModel)
  // async addRecipe(
  //   @Args('newRecipeData') newRecipeData: NewRecipeInput,
  // ): Promise<AnnouncementsModel> {
  //   const recipe = await this.announcementsService.create(newRecipeData);
  //   pubSub.publish('recipeAdded', { recipeAdded: recipe });
  //   return recipe;
  // }

  // @Mutation(returns => Boolean)
  // async removeRecipe(@Args('id') id: string) {
  //   return this.announcementsService.remove(id);
  // }

  // @Subscription(returns => AnnouncementsModel)
  // recipeAdded() {
  //   return pubSub.asyncIterator('recipeAdded');
  // }
}
