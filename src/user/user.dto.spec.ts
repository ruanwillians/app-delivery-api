import { mockUsercreate } from './utils/mock';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';

const mockUserCreate: CreateUserDto = mockUsercreate();

async function testFieldValidation(
  dto: CreateUserDto,
  field: string,
  constraint: string,
) {
  const errors = await validate(dto);
  expect(errors).toHaveLength(1);
  expect(errors[0].property).toEqual(field);
  expect(errors[0].constraints).toHaveProperty(constraint);
}

describe('create user validate ', () => {
  it('should create user not name', async () => {
    const dto = new CreateUserDto({
      ...mockUserCreate,
      username: null,
    });

    await testFieldValidation(dto, 'username', 'isString');
  });
  it('should create user email invalid', async () => {
    const dto = new CreateUserDto({
      ...mockUserCreate,
      email: 'invalid email',
    });

    await testFieldValidation(dto, 'email', 'isEmail');
  });
  it('should create user email invalid', async () => {
    const dto = new CreateUserDto({
      ...mockUserCreate,
      email: null,
    });

    await testFieldValidation(dto, 'email', 'isEmail');
  });

  it('should create user document invalid', async () => {
    const dto = new CreateUserDto({
      ...mockUserCreate,
      document: '123',
    });

    await testFieldValidation(dto, 'document', 'isLength');
  });

  it('should create user phone invalid', async () => {
    const dto = new CreateUserDto({
      ...mockUserCreate,
      phone: '123',
    });

    await testFieldValidation(dto, 'phone', 'isPhoneNumber');
  });
  it('should create user succesfuly', async () => {
    const dto = new CreateUserDto({
      ...mockUserCreate,
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
