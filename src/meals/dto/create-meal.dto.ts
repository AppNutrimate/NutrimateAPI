import { IsString } from 'class-validator';

export class CreateMealDto {
  @IsString()
  icon: string;

  @IsString()
  name: string;

  constructor(partial: Partial<CreateMealDto>) {
    Object.assign(this, partial);
  }
}
