import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { WorkoutsService } from "./workouts.service";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateWorkoutDto } from "./dto/create-workout-dto";

@ApiTags('workouts')
@ApiBearerAuth()
@Controller('workouts')
export class WorkoutsController {
    constructor(
        private readonly workoutService: WorkoutsService
    ) { }
    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createWorkoutDto: CreateWorkoutDto) {
        return this.workoutService.create(createWorkoutDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    findByUser(@Req() req: any) {
        const userId = req.user.id;
        return this.workoutService.findByUser(userId);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe) id: string) {
        return this.workoutService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe) id: string,
        @Body() updateWorkoutDto: Partial<CreateWorkoutDto>) {
        return this.workoutService.update(id, updateWorkoutDto);
    }
}