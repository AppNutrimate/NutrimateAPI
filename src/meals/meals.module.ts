import { forwardRef, Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { UsersModule } from '../users/users.module';
import { RecipesModule } from '../recipes/recipes.module';
import { DietPlan } from 'src/dietplans/entities/dietplan.entity';
import { DietPlansModule } from 'src/dietplans/dietplans.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meal, DietPlan]),
    forwardRef(() => UsersModule),
    RecipesModule,
    DietPlansModule,
  ],
  providers: [MealsService],
  exports: [MealsService],
})
export class MealsModule { }