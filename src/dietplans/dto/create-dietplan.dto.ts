import { IsUUID, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateDietPlanDto {
    @IsUUID()
    userId: string;

    @IsOptional()
    @IsDateString()
    availableAt?: Date;

    @IsOptional()
    @IsBoolean()
    isVisible?: boolean;
}
