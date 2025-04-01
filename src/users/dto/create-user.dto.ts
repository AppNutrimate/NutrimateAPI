import {
  IsDateString,
  IsEmail,
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

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
