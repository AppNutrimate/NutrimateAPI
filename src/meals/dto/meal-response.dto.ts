import { ApiProperty } from '@nestjs/swagger';
import { Meal } from '../entities/meal.entity';

export class MealResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    icon: string;

    // TODO:
    // @ApiProperty({ type: () => [RecipeResponseDto] })
    // recipes: RecipeResponseDto[];

    @ApiProperty()
    dietPlanId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    professionalId: string;

    constructor(meal: Meal) {
        this.id = meal.id;
        this.name = meal.name;
        this.icon = meal.icon;

        this.dietPlanId = meal.dietPlan?.id;
        this.userId = meal.dietPlan?.user?.id;
        this.professionalId = meal.dietPlan?.professional?.id;
    }
}