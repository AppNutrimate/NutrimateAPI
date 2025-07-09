import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateDietPlanDto } from "./dto/create-dietplan.dto";
import { DietPlanResponseDto } from "./dto/dietplan-response.dto";
import { DietPlansService } from "./dietplans.service";
import { DietPlan } from "./entities/dietplan.entity";

@Controller('diets')
export class DietPlansController {
    constructor(
        private readonly dietPlansService: DietPlansService
    ) { }

    @UseGuards(AuthGuard)
    @Post()
    async create(
        @Req() req,
        @Body() dto: CreateDietPlanDto,
    ): Promise<DietPlanResponseDto> {
        const professionalId = req.user.sub;
        const plan = await this.dietPlansService.create(professionalId, dto.userId, dto);
        return new DietPlanResponseDto(plan);
    }

    @UseGuards(AuthGuard)
    @Get('users/:userId')
    async findByUser(@Param('userId') userId: string): Promise<DietPlanResponseDto[]> {
        const plans = await this.dietPlansService.findByUser(userId);
        return plans.map(plan => new DietPlanResponseDto(plan));
    }

    @UseGuards(AuthGuard)
    @Delete(':dietPlanId')
    async remove(@Req() req, @Param('dietPlanId') dietPlanId: string): Promise<void> {
        const professionalId = req.user.sub;
        return this.dietPlansService.remove(professionalId, dietPlanId);
    }

    @UseGuards(AuthGuard)
    @Put(':dietPlanId')
    async update(@Req() req, @Param('dietPlanId') dietPlanId: string, @Body() dto: Partial<DietPlan>): Promise<DietPlanResponseDto> {
        const professionalId = req.user.sub;
        const updated = await this.dietPlansService.update(professionalId, dietPlanId, dto);
        return new DietPlanResponseDto(updated);
    }
}