import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Workout } from "./entities/workout.entity";
import { WorkoutsService } from "./workouts.service";
import { WorkoutsController } from "./workouts.controller";
import { SportsModule } from "src/sports/sports.module";

@Module({
    imports: [TypeOrmModule.forFeature([Workout]), SportsModule],
    controllers: [WorkoutsController],
    providers: [WorkoutsService],
    exports: [WorkoutsService],
})
export class WorkoutsModule { }