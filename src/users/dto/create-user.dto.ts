import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  profilePhoto: string;

  @IsPhoneNumber('BR')
  phone: string;

  @IsDateString()
  @IsNotEmpty()
  birth: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNumber()
  height: number;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
