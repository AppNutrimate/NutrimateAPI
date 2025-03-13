import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { MealsService } from '../meals/meals.service';
import { CreateMealDto } from '../meals/dto/create-meal.dto';
import { Meal } from '../meals/entities/meal.entity';
import { AddRecipeToMealDto } from './dto/add-recipe-to-meal.dto';
import { Recipe } from '../recipes/entities/recipe.entity';

const createUserDto = new CreateUserDto({
  firstName: 'John',
  lastName: 'Doe',
  profilePhoto: 'profile.jpg',
  phone: '1234567890',
  birth: '1990-01-01',
  email: 'john.doe@example.com',
  password: 'password123',
});

const mockUsers = [
  new User({
    ...createUserDto,
    id: '84c63711-e4fa-498c-844c-1e75cf7ff1eb',
    meals: [],
  }),
  new User({
    id: '990486dc-5a47-4d3a-9283-c58e4d7a9f5f',
    firstName: 'Jane',
    lastName: 'Doe',
    profilePhoto: 'profile.jpg',
    phone: '1234567890',
    birth: '1990-01-01',
    email: 'jane.doe@example.com',
    password: 'password123',
    meals: [],
  }),
];

const createMealDto = new CreateMealDto({
  icon: 'icon.jpg',
  name: 'Breakfast',
});

const mockMeals = [
  new Meal({
    ...createMealDto,
    id: '76054ec1-e15c-4c55-991e-2733a794d91c',
  }),
  new Meal({
    id: '6d62ee07-9262-4b70-a81a-5694fcdde262',
    icon: 'icon2.jpg',
    name: 'Lunch',
  }),
];

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

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let mealsService: MealsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUsers[0]),
            findAll: jest.fn().mockResolvedValue(mockUsers),
            findOne: jest.fn().mockResolvedValue(mockUsers[0]),
            update: jest.fn().mockResolvedValue(mockUsers[1]),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
        {
          provide: MealsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockMeals),
            create: jest.fn().mockResolvedValue(mockMeals[0]),
            findOne: jest.fn().mockResolvedValue(mockMeals[0]),
            update: jest.fn().mockResolvedValue(mockMeals[0]),
            remove: jest.fn().mockResolvedValue(undefined),
            addRecipe: jest
              .fn()
              .mockResolvedValue({ ...mockMeals[0], recipes: mockRecipes[0] }),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    mealsService = module.get<MealsService>(MealsService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      // Act
      const result = await usersController.create(createUserDto);

      // Assert
      expect(result).toEqual({
        message: 'User created sucessfully',
        user: mockUsers[0],
      });

      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(usersService, 'create').mockRejectedValueOnce(new Error());

      // Act
      expect(usersController.create(createUserDto)).rejects.toThrow();
    });
  });

  describe('createMeal', () => {
    it('should create a meal', async () => {
      // Act
      const result = await usersController.createMeal(createMealDto, {
        user: { sub: mockUsers[0].id },
      });

      // Assert
      expect(result).toEqual({
        message: 'Meal created sucessfully',
        meal: mockMeals[0],
      });

      expect(mealsService.create).toHaveBeenCalledWith(
        createMealDto,
        mockUsers[0].id,
      );
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(mealsService, 'create').mockRejectedValueOnce(new Error());

      // Act
      const result = usersController.createMeal(createMealDto, {
        user: { sub: mockUsers[0].id },
      });

      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      // Act
      const result = await usersController.findAll();

      // Assert
      expect(result).toEqual(mockUsers);

      expect(usersService.findAll).toHaveBeenCalled();
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(usersService, 'findAll').mockRejectedValueOnce(new Error());

      // Act
      expect(usersController.findAll()).rejects.toThrow();
    });
  });

  describe('findAllMeals', () => {
    it('should find all meals', async () => {
      // Act
      const result = await usersController.findAllMeals({
        user: { sub: mockUsers[0].id },
      });

      // Assert
      expect(result).toEqual(mockMeals);

      expect(mealsService.findAll).toHaveBeenCalledWith(mockUsers[0].id);
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(mealsService, 'findAll').mockRejectedValueOnce(new Error());

      // Act
      const result = usersController.findAllMeals({
        user: { sub: mockUsers[0].id },
      });

      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('findOneMeal', () => {
    it('should find a meal', async () => {
      // Act
      const result = await usersController.findOneMeal(mockMeals[0].id, {
        user: { sub: mockUsers[0].id },
      });

      // Assert
      expect(result).toEqual(mockMeals[0]);

      expect(mealsService.findOne).toHaveBeenCalledWith(
        mockMeals[0].id,
        mockUsers[0].id,
      );
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(mealsService, 'findOne').mockRejectedValueOnce(new Error());

      // Act
      const result = usersController.findOneMeal(
        mockMeals[0].id,
        mockUsers[0].id,
      );

      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should find a user', async () => {
      // Arrange
      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(mockUsers[0]);

      // Act
      const result = await usersController.findOne(mockUsers[0].id);

      // Assert
      expect(result).toEqual(mockUsers[0]);

      expect(usersService.findOne).toHaveBeenCalledWith(mockUsers[0].id);
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(usersService, 'findOne').mockRejectedValueOnce(new Error());

      // Act
      expect(usersController.findOne(mockUsers[0].id)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      // Arrange
      const updateUserDto = {
        firstName: 'Jane',
        lastName: 'Doe',
        profilePhoto: 'profile.jpg',
        phone: '1234567890',
        birth: '1990-01-01',
        email: 'jane.doe@example.com',
        password: 'password123',
      };

      // Act
      const result = await usersController.update(
        mockUsers[0].id,
        updateUserDto,
      );

      // Assert
      expect(result).toEqual(mockUsers[1]);

      expect(usersService.update).toHaveBeenCalledWith(
        mockUsers[0].id,
        updateUserDto,
      );
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(usersService, 'update').mockRejectedValueOnce(new Error());

      // Act
      expect(
        usersController.update(mockUsers[0].id, mockUsers[1]),
      ).rejects.toThrow();
    });
  });

  describe('updateMeal', () => {
    it('should update a meal', async () => {
      // Act
      const result = await usersController.updateMeal(
        mockMeals[0].id,
        createMealDto,
        { user: { sub: mockUsers[0].id } },
      );

      // Assert
      expect(result).toEqual(mockMeals[0]);
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(mealsService, 'update').mockRejectedValueOnce(new Error());

      // Act
      const result = usersController.updateMeal(
        mockMeals[0].id,
        createMealDto,
        { user: { sub: mockUsers[0].id } },
      );
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      // Act
      const result = await usersController.remove(mockUsers[0].id);

      // Assert
      expect(result).toBeUndefined();

      expect(usersService.remove).toHaveBeenCalledWith(mockUsers[0].id);
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(usersService, 'remove').mockRejectedValueOnce(new Error());

      // Act
      expect(usersController.remove(mockUsers[0].id)).rejects.toThrow();
    });
  });

  describe('removeMeal', () => {
    it('should remove a meal', async () => {
      // Act
      const result = await usersController.removeMeal(mockMeals[0].id, {
        user: { sub: mockUsers[0].id },
      });

      // Assert
      expect(result).toBeUndefined();

      expect(mealsService.remove).toHaveBeenCalledWith(
        mockMeals[0].id,
        mockUsers[0].id,
      );
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(mealsService, 'remove').mockRejectedValueOnce(new Error());

      // Act
      expect(
        usersController.removeMeal(mockMeals[0].id, mockUsers[0].id),
      ).rejects.toThrow();
    });
  });

  describe('addRecipeToMeal', () => {
    it('should add a recipe to a meal', async () => {
      // Act
      const result = await usersController.addRecipeToMeal(
        mockMeals[0].id,
        addRecipeToMealDto,
        {
          user: { sub: mockUsers[0].id },
        },
      );

      // Assert
      expect(result).toEqual({ ...mockMeals[0], recipes: mockRecipes[0] });

      expect(mealsService.addRecipe).toHaveBeenCalledWith(
        mockMeals[0].id,
        mockUsers[0].id,
        addRecipeToMealDto,
      );
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(mealsService, 'addRecipe').mockRejectedValueOnce(new Error());

      // Act
      expect(
        usersController.addRecipeToMeal(mockMeals[0].id, addRecipeToMealDto, {
          user: { sub: mockUsers[0].id },
        }),
      ).rejects.toThrow();
    });
  });
});
