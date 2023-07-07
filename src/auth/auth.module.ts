import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModulo } from 'src/user/user.module';
import { PrismaServiceModulo } from 'src/prismaService/prisma.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'wsg)utyccxttftifma=-4rcqe1kuj!ph+86+-p_uh%h9bd=zye',
    }),
    UserModulo,
    PrismaServiceModulo,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
