import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prismaService/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'login',
          audience: 'Users',
        },
      ),
    };
  }

  checkToken(token: string) {
    return this.jwtService.verify(token, {
      audience: 'Users',
      issuer: 'login',
    });
  }

  isValidToken(token) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, password },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Email está incorreto');
    }

    // TO DO: enviar o e-mail...

    return true;
  }

  async reset(password: string, token: string) {
    // TO DO: Validar o token ....

    const id = '0123a1';

    const user = await this.prisma.user.update({
      where: {
        id,
      },

      data: {
        password,
      },
    });

    return this.createToken(user);
  }
}
