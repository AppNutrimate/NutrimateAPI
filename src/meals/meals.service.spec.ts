import { Test, TestingModule } from '@nestjs/testing';
import { MealsService } from './meals.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';

describe('MealsService', () => {
  let service: MealsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MealsService,
        { provide: getRepositoryToken(Meal), useValue: {} },
      ],
    }).compile();

    service = module.get<MealsService>(MealsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
