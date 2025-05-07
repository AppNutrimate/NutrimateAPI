import { Sport } from "src/sports/entities/sport.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Workout {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    date: Date;

    @Column()
    durationInMin: number;

    @Column()
    caloriesBurned: number;

    @ManyToOne(() => User, user => user.workouts, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Sport, sport => sport.workouts)
    sport: Sport;
}