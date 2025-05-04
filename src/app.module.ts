import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MealsModule } from './meals/meals.module';
import { RecipesModule } from './recipes/recipes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfessionalsModule } from './professionals/professionals.module';
import { WeightsModule } from './weights/weights.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    MealsModule,
    RecipesModule,
    ProfessionalsModule,
    WeightsModule,
    AuthModule,
  ],
})
export class AppModule { }
