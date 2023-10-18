export interface ILogger {
  debug(context: string, message: string): void;
  log(context: string, message: string, data?: any): void;
  error(context: string, message: string, trace?: string): void;
  warn(context: string, message: string): void;
  verbose(context: string, message: string): void;
  setCtx(ctx: any): void;
}
