import { Test, TestingModule } from '@nestjs/testing';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from './entities/recipe.entity';

const createRecipeDto = new CreateRecipeDto({
  name: 'Spaghetti Carbonara',
  description: 'A delicious pasta dish',
  picture: 'spaghetti.jpg',
  calories: 500,
  proteins: 20,
  carbos: 50,
  fat: 25,
  prepTime: 30,
});

const mockRecipes = [
  new Recipe({
    id: '9d97e9c7-8622-4c70-aafe-f9c88bb3d2c0',
    ...createRecipeDto,
  }),
  new Recipe({
    id: '4b1fece8-76fe-4300-80dd-7f458ff07798',
    name: 'Tiramisu',
    description: 'A delicious dessert',
    picture: 'tiramisu.jpg',
    calories: 300,
    proteins: 10,
    carbos: 40,
    fat: 15,
    prepTime: 60,
  }),
];

describe('RecipesController', () => {
  let recipesController: RecipesController;
  let recipesService: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [
        {
          provide: RecipesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockRecipes[0]),
            findAll: jest.fn().mockResolvedValue(mockRecipes),
            findOne: jest.fn().mockResolvedValue(mockRecipes[0]),
            update: jest.fn().mockResolvedValue(mockRecipes[0]),
            remove: jest.fn().mockResolvedValue(mockRecipes[0]),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canACtivate: jest.fn(() => true),
      })
      .compile();

    recipesController = module.get<RecipesController>(RecipesController);
    recipesService = module.get<RecipesService>(RecipesService);
  });

  it('should be defined', () => {
    expect(recipesController).toBeDefined();
  });

  describe('create', () => {
    it('should create a recipe', async () => {
      // Act
      const result = await recipesController.create(createRecipeDto);

      // Assert
      expect(result).toEqual(mockRecipes[0]);

      expect(recipesService.create).toHaveBeenCalledWith(createRecipeDto);
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(recipesService, 'create').mockRejectedValue(new Error());

      // Act
      const result = recipesController.create(createRecipeDto);

      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return all recipes', async () => {
      // Act
      const result = await recipesController.findAll();

      // Assert
      expect(result).toEqual(mockRecipes);
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(recipesService, 'findAll').mockRejectedValue(new Error());

      // Act
      const result = recipesController.findAll();

      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return a recipe', async () => {
      // Act
      const result = await recipesController.findOne(mockRecipes[0].id);

      // Assert
      expect(result).toEqual(mockRecipes[0]);
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(recipesService, 'findOne').mockRejectedValue(new Error());

      // Act
      const result = recipesController.findOne(mockRecipes[0].id);

      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a recipe', async () => {
      // Act
      const result = await recipesController.update(
        mockRecipes[0].id,
        createRecipeDto,
      );

      // Assert
      expect(result).toEqual(mockRecipes[0]);
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(recipesService, 'update').mockRejectedValue(new Error());

      // Act
      const result = recipesController.update(
        mockRecipes[0].id,
        createRecipeDto,
      );

      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a recipe', async () => {
      // Act
      const result = await recipesController.remove(mockRecipes[0].id);

      // Assert
      expect(result).toEqual(mockRecipes[0]);
    });

    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(recipesService, 'remove').mockRejectedValue(new Error());

      // Act
      const result = recipesController.remove(mockRecipes[0].id);

      // Assert
      expect(result).rejects.toThrow();
    });
  });
});
