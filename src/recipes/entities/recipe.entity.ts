import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  picture: string;

  @Column()
  calories: number;

  @Column()
  proteins: number;

  @Column()
  carbos: number;

  @Column()
  fat: number;

  @Column()
  prepTime: number;

  constructor(partial: Partial<Recipe>) {
    Object.assign(this, partial);
  }
}
