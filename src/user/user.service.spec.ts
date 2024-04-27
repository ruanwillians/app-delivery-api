import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { mockUsercreate, mockUserList } from './utils/mock';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

const userEntityList: UserEntity[] = mockUserList();
const mockUserCreate: CreateUserDto = mockUsercreate();

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(userEntityList),
            create: jest.fn().mockResolvedValue(mockUserCreate),
            findOne: jest.fn().mockResolvedValue(null),
            save: jest.fn().mockResolvedValue(mockUserCreate),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('show get all users', () => {
    it('should return all users successfully', async () => {
      const result = await userService.findAll();

      expect(userRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(userEntityList);
    });

    it('should return error in repository ', async () => {
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

      await expect(userService.findAll()).rejects.toThrow(Error);
    });

    it('should return not found error', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValueOnce([]);

      await expect(userService.findAll()).rejects.toThrow(
        new NotFoundException('Nenhum usuário encontrado'),
      );
    });
  });

  describe('create new User', () => {
    it('should create new users successfully', async () => {
      const result = await userRepository.create(mockUserCreate);

      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUserCreate);
    });

    it('should throw ConflictException for email already exist', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(userEntityList[0]);

      await expect(userService.create(mockUserCreate)).rejects.toThrow(
        new ConflictException('Email already exists'),
      );
    });

    it('should throw Conflict Exception for document already exist', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(userEntityList[0]);

      const newUser = new CreateUserDto({
        ...mockUserCreate,
        email: 'validemail@email.com',
      });

      await expect(userService.create(newUser)).rejects.toThrow(
        new ConflictException('Document already exists'),
      );
    });

    it('should throw generic Error ', async () => {
      jest.spyOn(userRepository, 'create').mockImplementation(() => {
        throw new Error();
      });

      await expect(userService.create(mockUserCreate)).rejects.toThrow(
        new Error(),
      );
    });
  });
});
