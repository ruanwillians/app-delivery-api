import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from './../entities/user.entity';

export const mockUserList = () => {
  const userEntityList: UserEntity[] = [
    new UserEntity({
      id: 'd0051446-59ef-4201-a323-f84dd4b63557',
      username: 'user1',
      email: 'user1@example.com',
      password: 'password1',
      document: '43321514558',
      phone: '+5511987654321',
      is_active: true,
      created_at: new Date('2024-04-20'),
      updated_at: new Date('2024-04-20'),
    }),
    new UserEntity({
      id: 'bbf8c84c-9745-4f74-8f39-0b655eb9cc1f',
      username: 'user2',
      email: 'user2@example.com',
      password: 'password2',
      document: '42556898775',
      phone: '+5511987654821',
      is_active: false,
      created_at: new Date('2024-04-19'),
      updated_at: new Date('2024-04-19'),
    }),
  ];

  return userEntityList;
};

export const mockUsercreate = (): CreateUserDto => {
  const userDto: CreateUserDto = new CreateUserDto({
    username: 'user1',
    email: 'user1@example.com',
    password: 'password1',
    document: '43321514558',
    phone: '+5511987654321',
    is_active: true,
    is_manager: true,
  });

  return userDto;
};
