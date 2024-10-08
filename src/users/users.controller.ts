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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post('meals')
  async createMeal(@Body() createMealDto: CreateMealDto, @Request() req) {
    const meal = await this.mealsService.create(createMealDto, req.user.sub);
    return { message: 'Meal created sucessfully', meal };
  }
}
