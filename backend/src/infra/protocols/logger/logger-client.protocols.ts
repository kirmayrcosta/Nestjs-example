import { ILogger } from '../../../domain/protocols/ILogger';
import { Injectable, LoggerService } from '@nestjs/common';
import winston, { createLogger, transports, format } from 'winston';

/*eslint-disable */
const LokiTransport = require('winston-loki');

interface context {
  requestId?: string;
  correlationId?: string;
  path?: string;
  method?: string;
}

@Injectable()
export class LoggerClientProtocols implements LoggerService, ILogger {
  private _logger: winston.Logger;
  private requestId: string;
  private correlationId: any;
  private path: string;
  private method: string;

  constructor() {
    const silent = process.env.NODE_ENV === 'TEST' ? true : false;
    this._logger = createLogger({
      transports: [
        new transports.Console({
          silent,
        }),
        new LokiTransport({
          host: 'http://127.0.0.1:3100',
          json: true,
          format: format.json(),
          replaceTimestamp: true,
          labels: { service: 'currency-service' },
        }),
      ],
    });
  }

  setCtx(ctx: any) {
    this.requestId = ctx.requestId;
    this.correlationId = ctx.correlationId;
    this.path = ctx.path;
    this.method = ctx.method;

    return {
      requestId: this.requestId,
      correlationId: this.correlationId,
      path: this.path,
      method: this.method,
    };
  }

  debug(context: string, message: string, ctx?: any) {
    this._logger.debug(`[DEBUG] [${context}] ${message}`, ctx);
  }
  log(message: string, context: string, data?: any) {
    const ctx: context = {};
    let dataCtx = {};
    if (this.requestId) {
      ctx.requestId = this.requestId;
      ctx.correlationId = this.correlationId;
      ctx.path = this.path;
      ctx.method = this.method;
    }

    if (data) {
      dataCtx = { ...data };
    }

    this._logger.info(`[INFO] [${context}] ${message}`, { ...ctx, ...dataCtx });
  }
  error(context: string, message: string, trace?: string) {
    this._logger.error(`[ERROR] [${context}] ${message}`, trace);
  }
  warn(context: string, message: string) {
    this._logger.warn(`[WARN] [${context}] ${message}`);
  }
  verbose(context: string, message: string) {
    this._logger.warn(`[VERBOSE] [${context}] ${message}`);
  }
}
