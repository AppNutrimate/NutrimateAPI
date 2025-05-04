import {
    IsString,
    IsEmail,
    IsOptional,
    IsBoolean,
    IsDateString,
    IsStrongPassword,
    IsPhoneNumber,
} from 'class-validator';
import { IsCPF } from 'src/utils/cpf.validator';


export class CreateProfessionalDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({}, {
        message: 'A senha precisa conter ao menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um símbolo.'
    })
    password: string;

    @IsPhoneNumber('BR', { message: 'Número de telefone inválido' })
    phone: string;

    @IsDateString()
    birth: string;

    @IsOptional()
    @IsString()
    registration?: string;

    @IsString()
    @IsCPF()
    cpf: string;

    @IsOptional()
    @IsString()
    area?: string;

    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsDateString()
    createdAt?: Date;

    @IsOptional()
    @IsDateString()
    updatedAt?: Date;

    constructor(partial: Partial<CreateProfessionalDto>) {
        Object.assign(this, partial);
    }
}
