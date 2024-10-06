import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { MealsService } from '../meals/meals.service';
import { CreateMealDto } from '../meals/dto/create-meal.dto';
import { UpdateMealDto } from '../meals/dto/update-meal.dto';
import { AddRecipeToMealDto } from './dto/add-recipe-to-meal.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mealsService: MealsService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { message: 'User created sucessfully', user };
  }

  @UseGuards(AuthGuard)
  @Post('meals')
  async createMeal(@Body() createMealDto: CreateMealDto, @Request() req) {
    const meal = await this.mealsService.create(createMealDto, req.user.sub);
    return { message: 'Meal created sucessfully', meal };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @UseGuards(AuthGuard)
  @Get('meals')
  async findAllMeals(@Request() req) {
    const meals = await this.mealsService.findAll(req.user.sub);
    return meals;
  }

  @UseGuards(AuthGuard)
  @Get('meals/:id')
  async findOneMeal(@Param('id') id: string, @Request() req) {
    const meal = await this.mealsService.findOne(id, req.user.sub);
    return meal;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch('meals/:id')
  async updateMeal(
    @Param('id') id: string,
    @Body() updateMealDto: UpdateMealDto,
    @Request() req,
  ) {
    return await this.mealsService.update(id, req.user.sub, updateMealDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Delete('meals/:id')
  async removeMeal(@Param('id') id: string, @Request() req) {
    return this.mealsService.remove(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('meals/:mealId/recipe')
  async addRecipeToMeal(
    @Param('mealId') mealId: string,
    @Body() addRecipeToMealDto: AddRecipeToMealDto,
    @Request() req,
  ) {
    return this.mealsService.addRecipe(
      mealId,
      req.user.sub,
      addRecipeToMealDto,
    );
  }
}
