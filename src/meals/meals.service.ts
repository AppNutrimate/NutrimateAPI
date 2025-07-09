import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Recipe } from '../recipes/entities/recipe.entity';
import { AddRecipeToMealDto } from '../users/dto/add-recipe-to-meal.dto';
import { UsersService } from '../users/users.service';
import { RecipesService } from '../recipes/recipes.service';
import { DietPlan } from 'src/dietplans/entities/dietplan.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
    private readonly usersService: UsersService,
    private readonly recipesService: RecipesService,

    @InjectRepository(DietPlan)
    private dietPlansRepository: Repository<DietPlan>
  ) { }

  async create(createMealDto: CreateMealDto, dietPlanId: string) {
    const { name, icon } = createMealDto;
    const dietPlan = await this.dietPlansRepository.findOne({ where: { id: dietPlanId } });
    const meal = this.mealsRepository.create({
      name,
      icon,
      dietPlan,
    });
    return await this.mealsRepository.save(meal);
  }

  async findAll(userId: string) {
    return await this.mealsRepository.find({
      where: { dietPlan: { user: { id: userId } } },
      relations: ['recipes', 'dietPlan'],
    });
  }

  async findOne(id: string, userId: string) {
    const meal = await this.mealsRepository.findOne({
      where: { id, dietPlan: { user: { id: userId } } },
      relations: ['recipes'],
    });

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    return meal;
  }

  async update(id: string, userId: string, updateMealDto: UpdateMealDto) {
    const meal = await this.findOne(id, userId);
    return await this.mealsRepository.save({ ...meal, ...updateMealDto });
  }

  async remove(id: string, userId: string) {
    const meal = await this.findOne(id, userId);
    return await this.mealsRepository.remove(meal);
  }

  async addRecipe(
    mealId: string,
    userId: string,
    addRecipeToMealDto: AddRecipeToMealDto,
  ) {
    const { recipeId } = addRecipeToMealDto;
    const meal = await this.findOne(mealId, userId);
    const recipe = await this.recipesService.findOne(recipeId);
    meal.recipes.push(recipe);
    return await this.mealsRepository.save(meal);
  }

  async removeRecipe(mealId: string, userId: string, recipeId: string) {
    const meal = await this.findOne(mealId, userId);
    if (!meal.recipes.some((recipe) => recipe.id === recipeId)) {
      throw new NotFoundException('Recipe not found in meal');
    }
    meal.recipes = meal.recipes.filter((recipe) => recipe.id !== recipeId);
    return await this.mealsRepository.save(meal);
  }
}
