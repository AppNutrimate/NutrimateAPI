import { ApiProperty } from '@nestjs/swagger';

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

    constructor(partial: Partial<MealResponseDto>) {
        Object.assign(this, partial);
    }
}