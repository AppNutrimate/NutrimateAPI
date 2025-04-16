import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ProfessionalsService } from "./professionals.service";
import { CreateProfessionalDto } from "./dto/create-professional.dto";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("professionals")
@ApiBearerAuth()
@Controller('professionals')
export class ProfessionalsController {
    constructor(private readonly professionalsService: ProfessionalsService) { }

    @Post()
    async create(@Body() createProfessionalDto: CreateProfessionalDto) {
        const professional = await this.professionalsService.create(createProfessionalDto);
        return { message: 'Professional created sucessfully', professional };
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll() {
        const users = await this.professionalsService.findAll();
        return users;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const professional = await this.professionalsService.findOne(id);
        return professional;
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateProfessionalDto: CreateProfessionalDto) {
        const professional = await this.professionalsService.update(id, updateProfessionalDto);
        return { message: 'Professional updated sucessfully', professional };
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async remove(@Param('id') id: string) {
        const professional = await this.professionalsService.remove(id);
        return { message: 'Professional removed sucessfully', professional };
    }


};