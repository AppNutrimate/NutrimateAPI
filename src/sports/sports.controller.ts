import { Controller, Get, Param } from '@nestjs/common';
import { SportsService } from './sports.service';

@Controller('sports')
export class SportsController {
    constructor(private readonly sportsService: SportsService) { }

    @Get()
    findAll() {
        return this.sportsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.sportsService.findOne(id);
    }
}