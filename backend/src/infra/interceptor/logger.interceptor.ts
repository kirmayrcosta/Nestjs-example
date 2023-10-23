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
import { MetricTelemetryProtocol } from '../protocols/metric/metric-telemetry.protocol';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LoggerClientProtocols,
    private readonly metric: MetricTelemetryProtocol,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.metric.start();
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    request.headers['x-request-id'] = v1();
    request.headers['x-correlation-id'] =
      request.headers['x-correlation-id'] || v1();
    request.headers['x-time'] = Date.now();
    this.logger.setCtx({
      requestId: request.headers['x-request-id'],
      correlationId: request.headers['x-correlation-id'],
      path: request.route.path.toUpperCase(),
      method: request.method.toUpperCase(),
    });
    this.logger.log(`Request Start`, `${request.method}:${request.route.path}`);

    return next.handle().pipe(
      tap(() => {
        this.metric.histogramRecord(Date.now() - now, {
          method: request.method.toUpperCase(),
          path: request.route.path.toUpperCase(),
          statusCode: httpContext.getResponse().statusCode,
        });
        this.logger.log(
          `Request end`,
          `${request.method}:${request.route.path}`,
          {
            statusCode: httpContext.getResponse().statusCode,
            duration: Date.now() - now,
          },
        );
      }),
    );
  }
}
