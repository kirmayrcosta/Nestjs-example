import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { LoggerClientProtocols } from '../protocols/logger/logger-client.protocols';
import { Cache, Milliseconds } from 'cache-manager';
import { of } from 'rxjs';

export class CacheInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LoggerClientProtocols,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const url = request.url;
    const method = request.method;
    const key = `${method}:${url}`;
    const cache = await this.cacheService.get(key);

    this.logger.setCtx({
      requestId: request.headers['x-request-id'],
      correlationId: request.headers['x-correlation-id'],
      path: request.route.path.toUpperCase(),
      method: request.method.toUpperCase(),
    });

    if (cache) {
      this.logger.log(`Cache hit`, `${method}:${url}`);
      return of(cache);
    }
    this.logger.log(`Cache miss`, `${method}:${url}`);

    return next.handle().pipe(
      tap((responseBody) => {
        const ttl: Milliseconds = 10000;
        this.cacheService.set(key, responseBody || {}, ttl);
      }),
    );
  }
}
