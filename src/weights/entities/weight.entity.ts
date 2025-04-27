import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';


@Entity('weight')
export class Weight {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 6, scale: 3 })
    value: number;

    @Column()
    measuredAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.weights, { onDelete: 'CASCADE' })
    user: User;
}
