import { Meal } from "src/meals/entities/meal.entity";
import { Professional } from "src/professionals/entities/professional.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('diet_plan')
export class DietPlan {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'timestamp', nullable: true })
    availableAt: Date;

    @Column({ default: false })
    isVisible: boolean

    @ManyToOne(() => Professional, { eager: true })
    @JoinColumn({ name: 'professionalId' })
    professional: Professional

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: User

    @OneToMany(() => Meal, (meal) => meal.dietPlan)
    meals: Meal[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

}