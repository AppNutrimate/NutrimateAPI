import { InjectRepository } from "@nestjs/typeorm";
import { DietPlan } from "./entities/dietplan.entity";
import { Repository } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Professional } from "src/professionals/entities/professional.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { ForbiddenException, NotFoundException } from "@nestjs/common";

export class DietPlansService {
    constructor(
        @InjectRepository(DietPlan)
        private dietPlansRepository: Repository<DietPlan>,

        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @InjectRepository(Professional)
        private professionalsRepository: Repository<Professional>,

        @InjectRepository(Patient)
        private patientsRepository: Repository<Patient>,
    ) { }

    async create(professionalId: string, userId: string, data: Partial<DietPlan>): Promise<DietPlan> {
        const isLinked = await this.patientsRepository.findOne({
            where: {
                user: { id: userId },
                professional: { id: professionalId },
            },
            relations: ['user', 'professional']
        })

        if (!isLinked) {
            throw new ForbiddenException("Você não tem permissão para criar plano para este usuário")
        }

        const user = await this.usersRepository.findOne({ where: { id: userId } })
        const professional = await this.professionalsRepository.findOne({ where: { id: professionalId } })

        if (!user || !professional) {
            throw new ForbiddenException("Usuário ou profissional não encontrado")
        }

        const plan = this.dietPlansRepository.create({
            ...data,
            professional,
            user
        })

        return this.dietPlansRepository.save(plan)
    }

    async update(professionalId: string, planId: string, data: Partial<DietPlan>): Promise<DietPlan> {
        const plan = await this.dietPlansRepository.findOne({
            where: { id: planId },
            relations: ['user', 'professional'],
        });

        if (!plan) {
            throw new NotFoundException('Plano não encontrado');
        }

        if (plan.professional.id !== professionalId) {
            throw new ForbiddenException('Você não pode editar este plano');
        }

        Object.assign(plan, data);
        return this.dietPlansRepository.save(plan);
    }

    async remove(professionalId: string, planId: string): Promise<void> {
        const plan = await this.dietPlansRepository.findOne({
            where: { id: planId },
            relations: ['professional'],
        });

        if (!plan) {
            throw new NotFoundException('Plano não encontrado');
        }

        if (plan.professional.id !== professionalId) {
            throw new ForbiddenException('Você não pode editar este plano');
        }

        await this.dietPlansRepository.remove(plan);
    }

    //TODO: está chegando os 'isVisible: false' aos users
    async findByUser(userId: string, professionalId: string): Promise<DietPlan[]> {
        const allPlans = await this.dietPlansRepository.find({
            where: {
                user: { id: userId },
            },
            relations: ['meals', 'meals.recipes', 'professional'],
            order: { availableAt: 'DESC' },
        });

        return allPlans.filter(
            (plan) => plan.isVisible || plan.professional?.id === professionalId,
        );
    }

}