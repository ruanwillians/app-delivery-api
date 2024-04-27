import {
  IsString,
  IsEmail,
  MinLength,
  IsPhoneNumber,
  IsBoolean,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @Length(11, 11)
  readonly document: string;

  @IsPhoneNumber()
  readonly phone: string;

  @IsBoolean()
  readonly is_active: boolean;

  @IsBoolean()
  readonly is_manager: boolean;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
  }
}
