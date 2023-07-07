import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const t = context.switchToHttp().getRequest();
        // const a = context.switchToWs().getClient();
        // console.log(a);

        console.log(
          'User:' +
            t.headers.username +
            '  ' +
            'action:' +
            t.method +
            ' ' +
            t.url,
        );
      }),
    );
  }
}
