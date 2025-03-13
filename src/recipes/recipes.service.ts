import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    const recipe = this.recipesRepository.create(createRecipeDto);
    return await this.recipesRepository.save(recipe);
  }

  async findAll() {
    return await this.recipesRepository.find();
  }

  async findOne(id: string) {
    const recipe = await this.recipesRepository.findOne({ where: { id } });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    return recipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.findOne(id);
    return await this.recipesRepository.save({ ...recipe, ...updateRecipeDto });
  }

  async remove(id: string) {
    const recipe = await this.findOne(id);
    return await this.recipesRepository.remove(recipe);
  }
}
