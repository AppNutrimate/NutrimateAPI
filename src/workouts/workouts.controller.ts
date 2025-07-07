import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
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
    findByUser(
        @Req() req: any,
        @Query('userId') userIdFromQuery?: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        const userId = userIdFromQuery || req.user.sub;
        return this.workoutService.findByUser(userId, Number(page), Number(limit));
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

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe) id: string) {
        return this.workoutService.remove(id);
    }
}