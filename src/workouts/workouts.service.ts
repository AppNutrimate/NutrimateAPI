import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Workout } from "./entities/workout.entity";
import { Repository } from "typeorm";
import { CreateWorkoutDto } from "./dto/create-workout-dto";


@Injectable()
export class WorkoutsService {
    constructor(
        @InjectRepository(Workout)
        private workoutsRepository: Repository<Workout>,
    ) { }

    async create(createWorkoutDto: CreateWorkoutDto) {
        const workout = this.workoutsRepository.create({
            ...createWorkoutDto,
            user: { id: createWorkoutDto.userId },
            sport: { id: createWorkoutDto.sportId },
        });

        return await this.workoutsRepository.save(workout);
    }

    async findByUser(userId: string) {
        const workouts = await this.workoutsRepository.find({
            where: { user: { id: userId } },
            order: { date: 'DESC' },
        });
        return workouts;
    }

    async findAll() {
        return await this.workoutsRepository.find();
    }

    async findOne(id: string) {
        const workout = await this.workoutsRepository.findOne({ where: { id } });
        if (!workout) {
            throw new NotFoundException('Workout not found');
        }
        return workout;
    }

    async update(id: string, updateWorkoutDto: Partial<CreateWorkoutDto>) {
        const workout = await this.findOne(id);
        Object.assign(workout, updateWorkoutDto);

        if (updateWorkoutDto.userId) {
            workout.user = { id: updateWorkoutDto.userId } as any;
        }

        if (updateWorkoutDto.sportId) {
            workout.sport = { id: updateWorkoutDto.sportId } as any;
        }

        return await this.workoutsRepository.save(workout);
    }

    async remove(id: string) {
        const workout = await this.findOne(id);
        return await this.workoutsRepository.remove(workout);
    }
}