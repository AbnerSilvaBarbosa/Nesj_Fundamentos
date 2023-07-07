import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Esse campo é obrigatório' })
  name: string;

  email: string;
  password: string;
  birthAt: string;
}
