import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from './recipes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';

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

describe('RecipesService', () => {
  let recipesService: RecipesService;
  let recipesRepository: Repository<Recipe>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        {
          provide: getRepositoryToken(Recipe),
          useValue: {
            create: jest.fn().mockReturnValue(mockRecipes[0]),
            save: jest.fn().mockResolvedValue(mockRecipes[0]),
            find: jest.fn().mockResolvedValue(mockRecipes),
            findOneOrFail: jest.fn().mockResolvedValue(mockRecipes[0]),
            preload: jest.fn().mockResolvedValue(mockRecipes[0]),
            remove: jest.fn().mockResolvedValue(mockRecipes[0]),
          },
        },
      ],
    }).compile();

    recipesService = module.get<RecipesService>(RecipesService);
    recipesRepository = module.get<Repository<Recipe>>(
      getRepositoryToken(Recipe),
    );
  });

  it('should be defined', () => {
    expect(recipesService).toBeDefined();
  });

  describe('create', () => {
    it('should create a recipe', async () => {
      // Act
      const result = await recipesService.create(createRecipeDto);
      // Assert
      expect(result).toEqual(mockRecipes[0]);
      expect(recipesRepository.create).toHaveBeenCalledTimes(1);
      expect(recipesRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(recipesRepository, 'save').mockRejectedValueOnce(new Error());
      // Act
      const result = recipesService.create(createRecipeDto);
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of recipes', async () => {
      // Act
      const result = await recipesService.findAll();
      // Assert
      expect(result).toEqual(mockRecipes);
      expect(recipesRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(recipesRepository, 'find').mockRejectedValueOnce(new Error());
      // Act
      const result = recipesService.findAll();
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return a recipe', async () => {
      // Act
      const result = await recipesService.findOne(mockRecipes[0].id);
      // Assert
      expect(result).toEqual(mockRecipes[0]);
      expect(recipesRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      // Arrange
      jest
        .spyOn(recipesRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      // Act
      const result = recipesService.findOne(mockRecipes[0].id);
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a recipe', async () => {
      // Act
      const result = await recipesService.update(
        mockRecipes[0].id,
        createRecipeDto,
      );
      // Assert
      expect(result).toEqual(mockRecipes[0]);
      expect(recipesRepository.preload).toHaveBeenCalledTimes(1);
      expect(recipesRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(recipesRepository, 'preload').mockResolvedValueOnce(null);
      // Act
      const result = recipesService.update(mockRecipes[0].id, createRecipeDto);
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a recipe', async () => {
      // Act
      const result = await recipesService.remove(mockRecipes[0].id);
      // Assert
      expect(result).toEqual(mockRecipes[0]);
      expect(recipesRepository.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(recipesService, 'findOne').mockRejectedValueOnce(new Error());
      // Act
      const result = recipesService.remove(mockRecipes[0].id);
      // Assert
      expect(result).rejects.toThrow();
    });
  });
});
