import { Controller, Get, Post, Body, Param, UseGuards, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateWeightDto } from './dto/create-weight.dto';
import { WeightsService } from './weights.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users/:userId/weights')
export class WeightsController {
    constructor(
        private readonly weightService: WeightsService
    ) { }

    @UseGuards(AuthGuard)
    @Post()
    create(
        @Param('userId', new ParseUUIDPipe) userId: string,
        @Body() createWeightDto: CreateWeightDto) {
        return this.weightService.create(userId, createWeightDto);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Param('userId') userId: string) {
        return this.weightService.findByUser(userId);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.weightService.findByUser(id);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe) id: string,
        @Body() updateWeightDto: CreateWeightDto) {
        return this.weightService.update(id, updateWeightDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id', new ParseUUIDPipe) id: string) {
        return this.weightService.delete(id);
    }
}
