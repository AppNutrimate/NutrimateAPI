import { Test, TestingModule } from '@nestjs/testing';
import { MealsService } from './meals.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { Repository } from 'typeorm';
import { Recipe } from '../recipes/entities/recipe.entity';
import { AddRecipeToMealDto } from '../users/dto/add-recipe-to-meal.dto';
import { RecipesService } from '../recipes/recipes.service';

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

const mockRecipes = [
  new Recipe({
    id: '79fa8aed-d66f-4686-b158-e53775e6b2f4',
    name: 'Spaghetti Carbonara',
    description: 'A delicious pasta dish',
    picture: 'spaghetti.jpg',
    calories: 500,
    proteins: 20,
    carbos: 50,
    fat: 25,
    prepTime: 30,
  }),
];

const addRecipeToMealDto = new AddRecipeToMealDto({
  recipeId: mockRecipes[0].id,
});

describe('MealsService', () => {
  let mealsService: MealsService;
  let mealsRepository: Repository<Meal>;
  let usersService: UsersService;
  let recipesService: RecipesService;

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
            findOne: jest.fn().mockResolvedValue(mockMeals[0]),
            remove: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: RecipesService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockRecipes[0]),
          },
        },
      ],
    }).compile();

    mealsService = module.get<MealsService>(MealsService);
    mealsRepository = module.get<Repository<Meal>>(getRepositoryToken(Meal));
    usersService = module.get<UsersService>(UsersService);
    recipesService = module.get<RecipesService>(RecipesService);
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
      jest.spyOn(usersService, 'findOne').mockRejectedValueOnce(new Error());
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
      jest.spyOn(mealsRepository, 'findOne').mockResolvedValueOnce(null);
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

  describe('addRecipe', () => {
    it('should add a recipe to a meal', async () => {
      // Arrange
      jest
        .spyOn(mealsRepository, 'findOne')
        .mockResolvedValueOnce({ ...mockMeals[0], recipes: [] });
      // Act
      const result = await mealsService.addRecipe(
        mockMeals[0].id,
        mockUser.id,
        { recipeId: mockRecipes[0].id },
      );
      // Assert
      expect(result).toEqual(mockMeals[0]);
    });

    it('should throw an error if meal is not found', async () => {
      // Arrange
      jest.spyOn(mealsRepository, 'findOne').mockResolvedValueOnce(null);
      // Act
      const result = mealsService.addRecipe(
        mockMeals[0].id,
        mockUser.id,
        addRecipeToMealDto,
      );
      // Assert
      expect(result).rejects.toThrow();
    });
  });
});
