import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prismaService/prisma.service';

@Injectable()
export class UserServices {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    const users = await this.prisma.user.findMany({});
    return users;
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async create(name, email, password, birthAt) {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        birthAt: new Date(birthAt),
      },
    });

    return user;
  }

  async update(idUser, newName) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: idUser,
        },

        data: {
          name: newName,
        },
      });

      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found in our register',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }
}
