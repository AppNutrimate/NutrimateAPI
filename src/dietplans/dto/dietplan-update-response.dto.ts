import { ApiProperty } from '@nestjs/swagger';
import { MealResponseDto } from 'src/meals/dto/meal-response.dto';
import { ProfessionalLowDto } from 'src/professionals/dto/professional-low.dto';

export class DietPlanUpdateResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty({ required: false })
    availableAt: Date;

    @ApiProperty()
    isVisible: boolean;

    @ApiProperty({ type: () => [ProfessionalLowDto] })
    professional: ProfessionalLowDto

    constructor(plan: any) {
        this.id = plan.id;
        this.professional = new ProfessionalLowDto(plan.professional)
        this.availableAt = plan.availableAt;
        this.isVisible = plan.isVisible;
    }
}
