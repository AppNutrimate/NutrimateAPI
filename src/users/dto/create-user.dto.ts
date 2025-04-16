import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  profilePhoto: string;

  @IsPhoneNumber('BR')
  phone: string;

  @IsDateString()
  birth: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsNumber()
  height: number;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
