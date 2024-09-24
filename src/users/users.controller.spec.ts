import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

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
    id: '84c63711-e4fa-498c-844c-1e75cf7ff1eb',
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

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

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
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
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
});
