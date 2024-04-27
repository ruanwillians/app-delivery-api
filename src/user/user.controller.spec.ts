import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mockUsercreate, mockUserList } from './utils/mock';
import { CreateUserDto } from './dto/create-user.dto';

const userEntityList: UserEntity[] = mockUserList();
const mockUserCreate: CreateUserDto = mockUsercreate();

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(userEntityList),
            create: jest.fn().mockResolvedValue(mockUserCreate),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('show get all users', () => {
    it('should return all users successfully', async () => {
      const result = await userController.findAll();

      expect(userService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(userEntityList);
    });

    it('should throw an error when userService.findAll fails', async () => {
      jest.spyOn(userService, 'findAll').mockRejectedValue(new Error());

      await expect(userController.findAll()).rejects.toThrow();
    });

    it('should throw an error not found when userService.findAll ', async () => {
      jest
        .spyOn(userService, 'findAll')
        .mockRejectedValueOnce(
          new NotFoundException('Nenhum usuário encontrado'),
        );

      await expect(userController.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('create new User', () => {
    it('should create new users successfully', async () => {
      const result = await userController.create(mockUserCreate);

      expect(userService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUserCreate);
    });

    it('should throw BadRequestException for invalid body', async () => {
      jest.spyOn(userService, 'create').mockImplementation(() => {
        throw new BadRequestException();
      });

      expect(() => userController.create(mockUserCreate)).toThrow(
        BadRequestException,
      );
    });
  });
});
