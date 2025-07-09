import { ApiProperty } from '@nestjs/swagger';
import { MealResponseDto } from 'src/meals/dto/meal-response.dto';

export class DietPlanResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty({ required: false })
    availableAt: Date;

    @ApiProperty()
    isVisible: boolean;

    @ApiProperty({ type: () => [MealResponseDto] })
    meals: MealResponseDto[];

    constructor(plan: any) {
        this.id = plan.id;
        this.availableAt = plan.availableAt;
        this.isVisible = plan.isVisible;
        this.meals = plan.meals?.map((meal) => new MealResponseDto(meal)) || [];
    }
}
