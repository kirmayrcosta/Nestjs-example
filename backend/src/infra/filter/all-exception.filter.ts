import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerClientProtocols } from '../protocols/logger/logger-client.protocols';
import { MetricTelemetryProtocol } from '../protocols/metric/metric-telemetry.protocol';

interface IError {
  message: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    public readonly logger: LoggerClientProtocols,
    public readonly metric: MetricTelemetryProtocol,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();
    this.metric.start();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : { message: (exception as Error).message };

    const responseData = {
      ...{
        statusCode: status,
      },
      ...message,
    };

    this.logMessage(request, message, status, exception);

    this.metric.histogramRecord(Date.now() - request.headers['x-time'], {
      method: request.method.toUpperCase(),
      path: request.path.toUpperCase(),
      statusCode: status,
    });
    response.status(status).json(responseData);
  }

  private logMessage(
    request: any,
    message: IError,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status}
         message=${message.message ? message.message : null}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        `Request end for ${request.path}`,
        `method=${request.method} status=${status}
        } message=${message.message ? message.message : null}`,
      );
    }
  }
}
