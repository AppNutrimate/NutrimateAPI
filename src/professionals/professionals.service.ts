import { Injectable } from "@nestjs/common";
import { Professional } from "./entities/professional.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as argon2 from "argon2";
import { CreateProfessionalDto } from "./dto/create-professional.dto";

@Injectable()
export class ProfessionalsService {
    constructor(
        @InjectRepository(Professional)
        private professionalsRepository: Repository<Professional>,
    ) { }

    async create(createProfessionalDto: CreateProfessionalDto) {
        const professional = this.professionalsRepository.create(createProfessionalDto);
        return await this.professionalsRepository.save(professional);
    }

    async findAll() {
        return await this.professionalsRepository.find();
    }

    async findOne(id: string) {
        const professional = await this.professionalsRepository.findOne({ where: { id } });

        if (!professional) {
            throw new Error("Professional not found");
        }

        return professional;
    }

    async findByEmail(email: string) {
        const professional = await this.professionalsRepository.findOne({ where: { email } });

        if (!professional) {
            throw new Error("Professional not found");
        }

        return professional;
    }

    async update(id: string, updateProfessionalDto: CreateProfessionalDto) {
        const professional = await this.findOne(id);
        if (updateProfessionalDto.password) {
            updateProfessionalDto.password = await argon2.hash(updateProfessionalDto.password);
        }
        return this.professionalsRepository.save({ ...professional, ...updateProfessionalDto });
    }

    async remove(id: string) {
        const professional = await this.findOne(id);
        return this.professionalsRepository.remove(professional);
    }

}