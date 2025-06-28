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
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { MealsService } from '../meals/meals.service';
import { CreateMealDto } from '../meals/dto/create-meal.dto';
import { UpdateMealDto } from '../meals/dto/update-meal.dto';
import { AddRecipeToMealDto } from './dto/add-recipe-to-meal.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mealsService: MealsService,
  ) { }

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
  async findOneMeal(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Request() req,
  ) {
    const meal = await this.mealsService.findOne(id, req.user.sub);
    return meal;
  }

  @UseGuards(AuthGuard)
  @Get('email')
  async findUserByEmail(@Query('email') email: string) {
    if (!email || email.length < 5) {
      throw new BadRequestException('Caracteres insuficientes para a busca');
    }

    const user = await this.usersService.findUsersByEmail(email);
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('user')
  findOne(@Request() req) {
    return this.usersService.findOne(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    const loggedUserId = req.user.sub;
    return await this.usersService.update(id, updateUserDto, loggedUserId);
  }

  @UseGuards(AuthGuard)
  @Patch('meals/:id')
  async updateMeal(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateMealDto: UpdateMealDto,
    @Request() req,
  ) {
    return await this.mealsService.update(id, req.user.sub, updateMealDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Delete('meals/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeMeal(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Request() req,
  ) {
    return this.mealsService.remove(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('meals/:mealId/recipe')
  async addRecipeToMeal(
    @Param('mealId', new ParseUUIDPipe()) mealId: string,
    @Body() addRecipeToMealDto: AddRecipeToMealDto,
    @Request() req,
  ) {
    return this.mealsService.addRecipe(
      mealId,
      req.user.sub,
      addRecipeToMealDto,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('meals/:mealId/recipe/:recipeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeRecipeFromMeal(
    @Param('mealId', new ParseUUIDPipe()) mealId: string,
    @Param('recipeId', new ParseUUIDPipe()) recipeId: string,
    @Request() req,
  ) {
    return this.mealsService.removeRecipe(mealId, req.user.sub, recipeId);
  }
}
