import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { Repository } from 'typeorm';
import { Recipe } from '../recipes/entities/recipe.entity';
import { AddRecipeToMealDto } from '../users/dto/add-recipe-to-meal.dto';
import { RecipesService } from '../recipes/recipes.service';
import { DietPlan } from 'src/dietplans/entities/dietplan.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
    private readonly recipesService: RecipesService,

    @InjectRepository(DietPlan)
    private dietPlansRepository: Repository<DietPlan>
  ) { }

  async create(dto: CreateMealDto, dietPlanId: string) {
    const dietPlan = await this.dietPlansRepository.findOne({ where: { id: dietPlanId } });

    if (!dietPlan) {
      throw new NotFoundException("Plano alimentar não encontrado")
    }

    const meal = this.mealsRepository.create({
      name: dto.name,
      icon: dto.icon,
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

  async update(dietPlanId: string, mealId: string, professionalId: string, updateMealDto: UpdateMealDto) {
    const meal = await this.mealsRepository.findOne({
      where: { id: mealId },
      relations: ['dietPlan', 'dietPlan.professional'],
    });
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    if (!meal.dietPlan || meal.dietPlan.id !== dietPlanId) {
      throw new NotFoundException('Meal not found in this plan');
    }

    if (meal.dietPlan.professional.id !== professionalId) {
      throw new ForbiddenException('Você não tem permissão para editar esta meal');
    }

    Object.assign(meal, updateMealDto);
    return await this.mealsRepository.save(meal);
  }

  async remove(dietPlanId: string, mealId: string, professionalId: string): Promise<void> {
    const meal = await this.mealsRepository.findOne({
      where: { id: mealId },
      relations: ['dietPlan', 'dietPlan.professional'],
    });

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    if (meal.dietPlan.id !== dietPlanId) {
      throw new NotFoundException('Meal not found');
    }

    if (!meal.dietPlan || meal.dietPlan.professional.id !== professionalId) {
      throw new ForbiddenException('Você não tem permissão para excluir esta meal');
    }

    await this.mealsRepository.remove(meal);
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
