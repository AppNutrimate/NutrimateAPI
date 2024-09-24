import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe } from '../../recipes/entities/recipe.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  icon: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.meals)
  user: User;

  @ManyToMany(() => Recipe)
  @JoinTable({ name: 'meal_recipe' })
  recipes: Recipe[];
}
