import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
// import { UpdateMealDto } from './dto/update-meal.dto';
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
    const user = await this.usersRepository.findOneBy({ id: userId });
    return this.mealsRepository.find({ where: { user } });
  }

  async findOne(id: string, userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    const meal = await this.mealsRepository.findOne({ where: { id, user } });
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }
    return meal;
  }

  // update(id: number, updateMealDto: UpdateMealDto) {
  //   return `This action updates a #${id} meal`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} meal`;
  // }
}
