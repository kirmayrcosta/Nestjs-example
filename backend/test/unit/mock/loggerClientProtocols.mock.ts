import {LoggerService} from "@nestjs/common";
import {ILogger} from "../../../src/domain/protocols/ILogger";

export class LoggerClientMock implements LoggerService, ILogger {
    debug(context: string, message: string): void {
    }

    error(message: any, ...optionalParams: any[]): any;
    error(context: string, message: string, trace?: string): void;
    error(message: any, ...optionalParams: (any)[]): any {
    }

    log(message: any, ...optionalParams: any[]): any;
    log(context: string, message: string, data?: any): void;
    log(message: any, ...optionalParams: (any)[]): any {
    }

    setCtx(ctx: any): void {
    }

    verbose(context: string, message: string): void {
    }

    warn(message: any, ...optionalParams: any[]): any;
    warn(context: string, message: string): void;
    warn(message: any, ...optionalParams: (any)[]): any {
    }
}
