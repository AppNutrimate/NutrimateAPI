import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Patient } from "./entities/patient.entity";
import { PatientsController } from "./patients.controller";
import { PatientsService } from "./patients.service";
import { UsersModule } from "src/users/users.module";
import { ProfessionalsModule } from "src/professionals/professionals.module";
import { User } from "src/users/entities/user.entity";
import { Professional } from "src/professionals/entities/professional.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([Patient, User, Professional]),
        UsersModule,
        ProfessionalsModule,
    ],
    controllers: [PatientsController],
    providers: [PatientsService],
    exports: [PatientsService],
})
export class PatientsModule { }
