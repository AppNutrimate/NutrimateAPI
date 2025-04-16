import { PartialType } from '@nestjs/swagger';
import { CreateProfessionalDto } from './create-professional.dto';

export class UpdateProfessionalDto extends PartialType(CreateProfessionalDto) { }

