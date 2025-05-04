import { IsNumber, IsDateString } from 'class-validator';

export class CreateWeightDto {
    @IsNumber()
    value: number;

    @IsDateString()
    measuredAt: string;
}
