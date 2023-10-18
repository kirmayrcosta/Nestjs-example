import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerClientProtocols } from '../protocols/logger/logger-client.protocols';
import { v1 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerClientProtocols) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    request.headers['x-request-id'] = v1();
    request.headers['x-correlation-id'] =
      request.headers['x-correlation-id'] || v1();
    this.logger.setCtx({
      requestId: request.headers['x-request-id'],
      correlationId: request.headers['x-correlation-id'],
      path: request.path.toUpperCase(),
      method: request.method.toUpperCase(),
    });
    this.logger.log(
      `Incoming Request on ${request.path}`,
      `method=${request.method}`,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `End Request for ${request.path}`,
          `method=${request.method} duration=${Date.now() - now}ms`,
          {
            statusCode: httpContext.getResponse().statusCode,
            duration: Date.now() - now,
          },
        );
      }),
    );
  }
}
