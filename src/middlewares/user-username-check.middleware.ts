import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class UserUserNameCheckMiddler implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.username === undefined) {
      throw new BadRequestException('Usuário sem autorização');
    }

    next();
  }
}
