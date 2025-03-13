import { IsUUID } from 'class-validator';

export class AddRecipeToMealDto {
  @IsUUID('4')
  recipeId: string;

  constructor(partial: Partial<AddRecipeToMealDto>) {
    Object.assign(this, partial);
  }
}
