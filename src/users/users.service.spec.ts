import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

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

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockReturnValue(mockUsers[0]),
            save: jest.fn().mockResolvedValue(mockUsers[0]),
            find: jest.fn().mockResolvedValue(mockUsers),
            findOne: jest.fn().mockResolvedValue(mockUsers[0]),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      // Act
      const result = await usersService.create(createUserDto);
      // Assert
      expect(result).toEqual(mockUsers[0]);
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(usersRepository, 'save').mockRejectedValueOnce(new Error());
      // Act
      const result = usersService.create(createUserDto);
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      // Act
      const result = await usersService.findAll();
      // Assert
      expect(result).toEqual(mockUsers);
      expect(usersRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(usersRepository, 'find').mockRejectedValueOnce(new Error());
      // Act
      const result = usersService.findAll();
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      // Act
      const result = await usersService.findOne(mockUsers[0].id);
      // Assert
      expect(result).toEqual(mockUsers[0]);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(null);
      // Act
      const result = usersService.findOne(mockUsers[0].id);
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('findByEmail', () => {
    it('should return a user', async () => {
      // Act
      const result = await usersService.findByEmail(mockUsers[0].email);
      // Assert
      expect(result).toEqual(mockUsers[0]);
      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(null);
      // Act
      const result = usersService.findByEmail(mockUsers[0].email);
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      // Act
      const result = await usersService.update(mockUsers[0].id, createUserDto);
      // Assert
      expect(result).toEqual(mockUsers[0]);
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(null);
      // Act
      const result = usersService.update(mockUsers[0].id, createUserDto);
      // Assert
      expect(result).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      // Act
      await usersService.remove(mockUsers[0].id);
      // Assert
      expect(usersRepository.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(usersRepository, 'findOne').mockResolvedValueOnce(null);
      // Act
      const result = usersService.remove(mockUsers[0].id);
      // Assert
      expect(result).rejects.toThrow();
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(usersRepository, 'remove').mockRejectedValueOnce(new Error());
      // Act
      const result = usersService.remove(mockUsers[0].id);
      // Assert
      expect(result).rejects.toThrow();
    });
  });
});
