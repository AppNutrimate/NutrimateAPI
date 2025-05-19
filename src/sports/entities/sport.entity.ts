import { Workout } from "src/workouts/entities/workout.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sport {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    title: string;

    @Column()
    icon: string;

    @Column()
    met: number;

    @OneToMany(() => Workout, workout => workout.sport)
    workouts: Workout[];
}
