import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from './entities/sport.entity';
import { SportsService } from './sports.service';
import { SportsController } from './sports.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Sport])],
    providers: [SportsService],
    controllers: [SportsController],
    exports: [SportsService],
})
export class SportsModule { }
