import { Sport } from "src/sports/entities/sport.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    userId: string;

    @ManyToOne(() => User, user => user.workouts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Sport, sport => sport.workouts)
    sport: Sport;
}