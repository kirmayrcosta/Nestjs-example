import { ILogger } from '../../../domain/protocols/ILogger';
import { Injectable, LoggerService } from '@nestjs/common';
import winston, { createLogger, transports } from 'winston';

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
    this._logger = createLogger({
      transports: [new transports.Console()],
    });
  }

  setCtx(ctx: any) {
    this.requestId = ctx.requestId;
    this.correlationId = ctx.correlationId;
    this.path = ctx.path;
    this.method = ctx.method;
  }

  debug(context: string, message: string) {
    if (process.env.NODE_ENV !== 'production') {
      this._logger.debug(`[DEBUG] ${message}`, context);
    }
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
    this._logger.error(`[ERROR] ${message}`, trace, context);
  }
  warn(context: string, message: string) {
    this._logger.warn(`[WARN] ${message}`, context);
  }
  verbose(context: string, message: string) {
    if (process.env.NODE_ENV !== 'production') {
      this._logger.warn(`[VERBOSE] ${message}`, context);
    }
  }
}
