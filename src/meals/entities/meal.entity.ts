import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe } from '../../recipes/entities/recipe.entity';
import { DietPlan } from 'src/dietplans/entities/dietplan.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  icon: string;

  @Column()
  name: string;

  @ManyToOne(() => DietPlan, dietPlan => dietPlan.meals)
  @JoinColumn({ name: 'dietPlanId' })
  dietPlan: DietPlan;


  @ManyToMany(() => Recipe)
  @JoinTable({ name: 'meal_recipe' })
  recipes: Recipe[];

  constructor(partial: Partial<Meal>) {
    Object.assign(this, partial);
  }
}
