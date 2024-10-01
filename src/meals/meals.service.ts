import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createMealDto: CreateMealDto, userId: string) {
    const { name, icon } = createMealDto;

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const meal = this.mealsRepository.create({
      name,
      icon,
      user,
    });
    return this.mealsRepository.save(meal);
  }

  async findAll(userId: string) {
    return this.mealsRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: string, userId: string) {
    const meal = await this.mealsRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }
    return meal;
  }

  async update(id: string, userId: string, updateMealDto: UpdateMealDto) {
    const meal = await this.mealsRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }
    return this.mealsRepository.save({ ...meal, ...updateMealDto });
  }

  async remove(id: string, userId: string) {
    const meal = await this.mealsRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }
    return this.mealsRepository.delete({ id, user: { id: userId } });
  }
}
