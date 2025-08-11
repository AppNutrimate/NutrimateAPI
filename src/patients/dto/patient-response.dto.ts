import { Expose, Type } from "class-transformer";

export class PatientUserDto {
    @Expose()
    id: string;

    @Expose()
    firstName: string

    @Expose()
    lastName: string;

    @Expose()
    profilePhoto: string;

    @Expose()
    email: string;

    @Expose()
    height: string;

    @Expose()
    phone: string;
}

export class PatientsResponseDto {
    @Expose()
    id: string

    @Expose({ name: 'created_at' })
    createdAt: Date;

    @Expose({ name: 'updated_at' })
    updatedAt: Date;

    @Expose()
    @Type(() => PatientUserDto)
    user: PatientUserDto;
}