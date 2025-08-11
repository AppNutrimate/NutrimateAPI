import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Patient } from "./entities/patient.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Professional } from "src/professionals/entities/professional.entity";

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private patientsRepository: Repository<Patient>,

        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @InjectRepository(Professional)
        private professionalsRepository: Repository<Professional>,
    ) { }

    async create(professionalId: string, userId: string): Promise<Patient> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        const professional = await this.professionalsRepository.findOne({ where: { id: professionalId } });

        if (!user || !professional) {
            throw new NotFoundException('Usuário ou profissional não encontrado');
        }

        const existingPatient = await this.patientsRepository.findOne({
            where: {
                user: { id: userId },
                professional: { id: professionalId },
            },
        });

        if (existingPatient) {
            throw new BadRequestException('Este usuário já está vinculado a este profissional.');
        }

        const patientCount = await this.patientsRepository.count({
            where: { professional: { id: professionalId } },
        });

        const maxPatients = 15;

        if (patientCount >= maxPatients) {
            throw new BadRequestException('Limite de pacientes atingido');
        }

        const patient = this.patientsRepository.create({ user, professional });
        return this.patientsRepository.save(patient);
    }

    async findAllByProfessional(professionalId: string): Promise<Patient[]> {
        return this.patientsRepository.find({
            where: { professional: { id: professionalId } },
            relations: ['user', 'professional']
        });
    }

    async remove(professionalId: string, userId: string): Promise<void> {
        const patient = await this.patientsRepository.findOne({
            where: {
                professional: { id: professionalId },
                user: { id: userId },
            },
            relations: ['user', 'professional'],
        });

        if (!patient) {
            throw new NotFoundException('Paciente não encontrado para este profissional');
        }

        await this.patientsRepository.remove(patient);
    }
}
