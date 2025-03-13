import { forwardRef, Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { UsersModule } from '../users/users.module';
import { RecipesModule } from '../recipes/recipes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meal]),
    forwardRef(() => UsersModule),
    RecipesModule,
  ],
  providers: [MealsService],
  exports: [MealsService],
})
export class MealsModule {}
