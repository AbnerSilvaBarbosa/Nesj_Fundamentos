import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/DTOs/createUserDTO';
import { UserServices } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserServices,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() { name, email, password, birthAt }: CreateUserDTO) {
    return this.userService.create(name, email, password, birthAt);
  }

  @Post('forget')
  async forget(@Body() body: { email: string }) {
    return this.authService.forget(body.email);
  }

  @Post('reset')
  async reset(@Body() body: { password: string; token: string }) {
    return this.authService.reset(body.password, body.token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@Req() req) {
    return { me: 'ok', data: req.tokenPayLoad };
  }
}
