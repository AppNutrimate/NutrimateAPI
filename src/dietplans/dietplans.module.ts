import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Professional } from "src/professionals/entities/professional.entity";
import { ProfessionalsModule } from "src/professionals/professionals.module";
import { User } from "src/users/entities/user.entity";
import { UsersModule } from "src/users/users.module";
import { DietPlansController } from "./dietplans.controller";
import { DietPlansService } from "./dietplans.service";
import { DietPlan } from "./entities/dietplan.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { PatientsModule } from "src/patients/patients.module";
import { MealsModule } from "src/meals/meals.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([DietPlan, User, Professional, Patient]),
        forwardRef(() => UsersModule),
        ProfessionalsModule,
        PatientsModule,
        forwardRef(() => MealsModule)
    ],
    controllers: [DietPlansController],
    providers: [DietPlansService],
    exports: [DietPlansService, TypeOrmModule],
})
export class DietPlansModule { }
