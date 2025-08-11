import { ApiProperty } from "@nestjs/swagger";

export class ProfessionalLowDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    registration: string;

    constructor(professional: any) {
        this.id = professional.id;
        this.registration = professional.registration
        this.firstName = professional.firstName;
        this.lastName = professional.lastName;
    }
}