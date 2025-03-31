import { Meal } from '../../meals/entities/meal.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as argon2 from 'argon2';

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

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
