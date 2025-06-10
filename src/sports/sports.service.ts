import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sport } from './entities/sport.entity';

@Injectable()
export class SportsService {
    constructor(
        @InjectRepository(Sport)
        private readonly sportRepository: Repository<Sport>,
    ) { }

    findAll() {
        return this.sportRepository.find();
    }

    findOne(id: string) {
        return this.sportRepository.findOne({ where: { id } });
    }
}
