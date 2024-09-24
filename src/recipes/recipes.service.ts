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

  create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipe = this.recipesRepository.create(createRecipeDto);
    return this.recipesRepository.save(recipe);
  }

  findAll() {
    return this.recipesRepository.find();
  }

  findOne(id: string) {
    return this.recipesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.recipesRepository.preload({
      id,
      ...updateRecipeDto,
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found!');
    }

    return this.recipesRepository.save(recipe);
  }

  async remove(id: string): Promise<void> {
    const recipe = await this.recipesRepository.findOne({ where: { id } });
    if (!recipe) {
      throw new NotFoundException('Recipe not found!');
    }

    await this.recipesRepository.remove(recipe);
  }
}
