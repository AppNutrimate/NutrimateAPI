import { Body, Controller, Get, Param, Post, UseGuards, Req, Delete } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { PatientsService } from "./patients.service";
import { PatientsResponseDto } from "./dto/patient-response.dto";
import { plainToInstance } from 'class-transformer';


@Controller('patients')
export class PatientsController {
    constructor(private readonly patientsService: PatientsService) { }

    @UseGuards(AuthGuard)
    @Get()
    async listPatientsByProfessionalId(@Req() req): Promise<PatientsResponseDto[]> {
        const professionalId = req.user.sub;
        const patients = await this.patientsService.findAllByProfessional(professionalId);

        return plainToInstance(PatientsResponseDto, patients, {
            excludeExtraneousValues: true,
        });
    }

    @UseGuards(AuthGuard)
    @Post()
    async addPatient(
        @Req() req,
        @Body('userId') userId: string,
    ): Promise<PatientsResponseDto> {
        const professionalId = req.user.sub
        const patientSaved = this.patientsService.create(professionalId, userId);
        return plainToInstance(PatientsResponseDto, patientSaved, {
            excludeExtraneousValues: true,
        });
    }

    @UseGuards(AuthGuard)
    @Delete(':userId')
    async removePatient(@Req() req, @Param('userId') userId: string) {
        const professionalId = req.user.sub;
        return this.patientsService.remove(professionalId, userId)
    }
}