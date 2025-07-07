import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Professional } from "./entities/professional.entity";
import { ProfessionalsService } from "./professionals.service";
import { ProfessionalsController } from "./professionals.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Professional]),
    ],
    controllers: [ProfessionalsController],
    providers: [ProfessionalsService],
    exports: [
        ProfessionalsService,
        TypeOrmModule,
    ],
})
export class ProfessionalsModule { }