import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServices } from './user.service';
import { PrismaServiceModulo } from 'src/prismaService/prisma.module';

@Module({
  imports: [PrismaServiceModulo],
  controllers: [UserController],
  providers: [UserServices],
  exports: [UserServices],
})
export class UserModulo {}
