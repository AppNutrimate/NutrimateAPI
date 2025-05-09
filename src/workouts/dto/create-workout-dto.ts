import { IsDateString, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateWorkoutDto {
    @IsString()
    userId: string;

    @IsString()
    name: string;

    @IsDateString()
    date: string;

    @IsNumber()
    @Min(1)
    @Max(1440)
    durationInMin: number;

    @IsNumber()
    @Min(1)
    @Max(10000)
    caloriesBurned: number;

    @IsString()
    sportId: string;

    constructor(partial: Partial<CreateWorkoutDto>) {
        Object.assign(this, partial);
    }
}