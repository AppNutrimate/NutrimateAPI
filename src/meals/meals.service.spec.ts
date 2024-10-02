import { Test, TestingModule } from '@nestjs/testing';
import { MealsService } from './meals.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { Repository } from 'typeorm';

const createMealDto = new CreateMealDto({
  name: 'Test Meal',
  icon: 'test.png',
});

const mockMeals = [
  new Meal({
    ...createMealDto,
    id: '8f5c3a74-4053-4841-ae82-823ce2fef095',
  }),
  new Meal({
    id: 'd96009fa-ec15-451e-a0bb-d08aa3320d06',
    name: 'Second Test Meal',
    icon: 'test2.png',
  }),
];

const mockUser = new User({
  id: '84c63711-e4fa-498c-844c-1e75cf7ff1eb',
  firstName: 'John',
  lastName: 'Doe',
  profilePhoto: 'profile.jpg',
  phone: '1234567890',
  birth: '1990-01-01',
  email: 'john.doe@example.com',
  password: 'password123',
  meals: [],
});

describe('MealsService', () => {
  let mealsService: MealsService;
  let mealsRepository: Repository<Meal>;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MealsService,
        {
          provide: getRepositoryToken(Meal),
          useValue: {
            create: jest.fn().mockReturnValue(mockMeals[0]),
            save: jest.fn().mockResolvedValue(mockMeals[0]),
            find: jest.fn().mockResolvedValue(mockMeals),
            findOneOrFail: jest.fn().mockResolvedValue(mockMeals[0]),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneOrFail: jest.fn().mockResolvedValue(mockUser),
          },
        },
        { provide: UsersService, useValue: {} },
      ],
    }).compile();

    mealsService = module.get<MealsService>(MealsService);
    mealsRepository = module.get<Repository<Meal>>(getRepositoryToken(Meal));
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(mealsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a meal', async () => {
      // Act
      const result = await mealsService.create(createMealDto, mockUser.id);
      // Assert
      expect(result).toEqual(mockMeals[0]);
    });

    it('should throw an error if user is not found', async () => {
      // Arrange
      jest
        .spyOn(usersRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      // Act
      const result = mealsService.create(createMealDto, mockUser.id);
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return all meals', async () => {
      // Act
      const result = await mealsService.findAll(mockUser.id);
      // Assert
      expect(result).toEqual(mockMeals);
    });

    it('should return an error', () => {
      // Arrange
      jest.spyOn(mealsRepository, 'find').mockRejectedValueOnce(new Error());
      // Act
      const result = mealsService.findAll(mockUser.id);
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return a meal', async () => {
      // Act
      const result = await mealsService.findOne(mockMeals[0].id, mockUser.id);
      // Assert
      expect(result).toEqual(mockMeals[0]);
    });

    it('should throw an error if meal is not found', () => {
      // Arrange
      jest
        .spyOn(mealsRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      // Act
      const result = mealsService.findOne(mockMeals[0].id, mockUser.id);
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a meal', async () => {
      // Act
      const result = await mealsService.update(
        mockMeals[0].id,
        mockUser.id,
        createMealDto,
      );
      // Assert
      expect(result).toEqual({ ...mockMeals[0], ...createMealDto });
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(mealsRepository, 'save').mockRejectedValueOnce(new Error());
      // Act
      const result = mealsService.update(
        mockMeals[0].id,
        mockUser.id,
        createMealDto,
      );
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a meal', async () => {
      // Act
      const result = await mealsService.remove(mockMeals[0].id, mockUser.id);
      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(mealsRepository, 'remove').mockRejectedValueOnce(new Error());
      // Act
      const result = mealsService.remove(mockMeals[0].id, mockUser.id);
      // Assert
      expect(result).rejects.toThrow();
    });
  });
});
