import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Recipe } from '../recipes/entities/recipe.entity';
import { AddRecipeToMealDto } from '../users/dto/add-recipe-to-meal.dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
  ) {}

  async create(createMealDto: CreateMealDto, userId: string) {
    // TODO change to use user service
    try {
      const { name, icon } = createMealDto;
      const user = await this.usersRepository.findOneOrFail({
        where: { id: userId },
      });

      const meal = this.mealsRepository.create({
        name,
        icon,
        user,
      });
      return await this.mealsRepository.save(meal);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findAll(userId: string) {
    return await this.mealsRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: string, userId: string) {
    try {
      const meal = await this.mealsRepository.findOneOrFail({
        where: { id, user: { id: userId } },
      });
      return meal;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
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
    try {
      const { recipeId } = addRecipeToMealDto;
      const meal = await this.mealsRepository.findOneOrFail({
        where: { id: mealId, user: { id: userId } },
        relations: ['recipes'],
      });

      const recipe = await this.recipesRepository.findOneOrFail({
        where: { id: recipeId },
      });

      meal.recipes.push(recipe);

      return await this.mealsRepository.save(meal);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
