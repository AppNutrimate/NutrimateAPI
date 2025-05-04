import { Injectable } from "@nestjs/common";
import { In, Repository } from "typeorm";
import { Weight } from "./entities/weight.entity";
import { User } from "src/users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateWeightDto } from "./dto/create-weight.dto";


@Injectable()
export class WeightsService {
    constructor(
        @InjectRepository(Weight)
        private weightsRepository: Repository<Weight>,

        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    async create(userId: string, createWeightDto: CreateWeightDto) {
        const user = await this.usersRepository.findOneBy({ id: userId });

        if (!user) {
            throw new Error('User not found');
        }

        const weight = this.weightsRepository.create({
            ...createWeightDto,
            user,
        });

        return this.weightsRepository.save(weight);
    }

    async findByUser(userId: string) {
        return this.weightsRepository.find({
            where: { user: { id: userId } },
            order: { measuredAt: "DESC" }
        });
    }

    async update(id: string, updateWeightDto: Partial<CreateWeightDto>) {
        const weight = await this.weightsRepository.findOneBy({ id });
        if (!weight) {
            throw new Error('Weight not found');
        }
        const updatedWeight = {
            ...weight,
            ...updateWeightDto,
        };
        return this.weightsRepository.save(updatedWeight);
    }

    async delete(id: string) {
        const weight = await this.weightsRepository.findOneBy({ id });

        if (!weight) {
            throw new Error('Weight not found');
        }

        return this.weightsRepository.delete(id);
    }

}