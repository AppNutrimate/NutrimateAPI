import { IsNumberString, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  picture: string;

  @IsString()
  calories: number;

  @IsNumberString()
  proteins: number;

  @IsNumberString()
  carbos: number;

  @IsNumberString()
  fat: number;

  @IsNumberString()
  prepTime: number;
}
