import {
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

const STRONG_PASSWORD_MESSAGE =
  'Your password must be at least 8 characters long, contain at least one number, ' +
  'one character, and have a mixture of uppercase and lowercase letters';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MaxLength(32)
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    { message: STRONG_PASSWORD_MESSAGE },
  )
  password: string;
}
