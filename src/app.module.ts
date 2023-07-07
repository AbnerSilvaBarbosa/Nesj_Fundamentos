import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModulo } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserUserNameCheckMiddler } from './middlewares/user-username-check.middleware';
import { UserIdCheckMiddleware } from './middlewares/user-id-check.middleware';

@Module({
  imports: [UserModulo, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserUserNameCheckMiddler)
      .exclude(
        { path: 'user/id', method: RequestMethod.ALL },
        { path: 'auth/login', method: RequestMethod.ALL },
      )
      .forRoutes('*');

    consumer.apply(UserIdCheckMiddleware).forRoutes('user/:id');
  }
}
