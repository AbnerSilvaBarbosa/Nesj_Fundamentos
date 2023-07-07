import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Ip,
} from '@nestjs/common';
import { UserServices } from './user.service';
import { CreateUserDTO } from './DTOs/createUserDTO';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserServices) {}

  @Get()
  async getUsers(@Ip() ip) {
    const a = ip;
    console.log(a);
    const users = await this.userServices.get();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id) {
    console.log(id);
    const user = await this.userServices.getById(id);
    return user;
  }

  @Post()
  async createUser(@Body() { name, email, password, birthAt }: CreateUserDTO) {
    const user = await this.userServices.create(name, email, password, birthAt);
    return user;
  }

  @Put()
  async updateUser(@Body() body: { idUser: number; newName: string }) {
    const update = await this.userServices.update(body.idUser, body.newName);
    return update;
  }

  // @Delete()
  // async deleteUser(@Body() body: { idUser: number; newName: string }) {
  //   const deleteUser = await this.userServices.delete(body);
  //   return deleteUser;
  // }
}
