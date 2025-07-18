import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateDietPlanDto } from "./dto/create-dietplan.dto";
import { DietPlanResponseDto } from "./dto/dietplan-response.dto";
import { DietPlansService } from "./dietplans.service";
import { DietPlan } from "./entities/dietplan.entity";
import { CreateMealDto } from "src/meals/dto/create-meal.dto";
import { MealsService } from "src/meals/meals.service";
import { UpdateMealDto } from "src/meals/dto/update-meal.dto";
import { MealResponseDto } from "src/meals/dto/meal-response.dto";
import { DietPlanUpdateResponseDto } from "./dto/dietplan-update-response.dto";

@Controller('diets')
export class DietPlansController {
    constructor(
        private readonly dietPlansService: DietPlansService,
        private readonly mealsService: MealsService
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
    async findByUser(@Req() req, @Param('userId') userId: string): Promise<DietPlanResponseDto[]> {
        const professionalId = req.user.sub
        const plans = await this.dietPlansService.findByUser(userId, professionalId);
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
    async update(@Req() req, @Param('dietPlanId') dietPlanId: string, @Body() dto: Partial<DietPlan>): Promise<DietPlanUpdateResponseDto> {
        const professionalId = req.user.sub;
        const updated = await this.dietPlansService.update(professionalId, dietPlanId, dto);
        return new DietPlanUpdateResponseDto(updated);
    }

    @UseGuards(AuthGuard)
    @Post(':dietPlanId/meals')
    async addMealToDietPlan(
        @Req() req,
        @Param('dietPlanId') dietPlanId: string,
        @Body() mealDto: CreateMealDto
    ): Promise<DietPlanResponseDto> {
        const professionalId = req.user.sub;
        const meal = await this.mealsService.create(mealDto, dietPlanId);
        return new DietPlanResponseDto(meal);
    }

    @UseGuards(AuthGuard)
    @Delete(':dietPlanId/meals/:mealId')
    async removeMealFromDietPlan(
        @Req() req,
        @Param('dietPlanId') dietPlanId: string,
        @Param('mealId') mealId: string,
    ): Promise<void> {
        const professionalId = req.user.sub
        await this.mealsService.remove(dietPlanId, mealId, professionalId)
    }

    @UseGuards(AuthGuard)
    @Put(':dietPlanId/meals/:mealId')
    async updateMealFromDietPlan(
        @Req() req,
        @Param('dietPlanId') dietPlanId: string,
        @Param('mealId') mealId: string,
        @Body() dto: UpdateMealDto
    ): Promise<MealResponseDto> {
        const professionalId = req.user.sub
        const updated = await this.mealsService.update(dietPlanId, mealId, professionalId, dto)
        return new MealResponseDto(updated)
    }
}