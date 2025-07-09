import { IsBoolean, IsDateString, IsOptional, IsUUID } from "class-validator";

export class CreateDietPlanDto {
    @IsOptional()
    @IsDateString()
    availableAt?: Date;

    @IsOptional()
    @IsBoolean()
    isVisible?: boolean;
}
