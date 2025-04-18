import { Meal } from '../../meals/entities/meal.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as argon2 from 'argon2';
import { Max, Min } from 'class-validator';
import { Weight } from 'src/weights/entities/weight.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  profilePhoto: string;

  @Column()
  phone: string;

  @Column()
  birth: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  @Min(0, { message: 'Deve ser maior do que 0' })
  @Max(300, { message: 'Não deve ser maior que 300' })
  height: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];

  @OneToMany(() => Weight, (weight) => weight.user)
  weights: Weight[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
