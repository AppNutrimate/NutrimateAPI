import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { Weight } from "./entities/weight.entity";
import { User } from "src/users/entities/user.entity";
import { WeightsService } from "./weights.service";
import { WeightsController } from "./weights.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Weight, User])],
    providers: [WeightsService],
    controllers: [WeightsController],
    exports: [WeightsService],
})
export class WeightsModule { }
