import { Module } from '@nestjs/common';
import { LoggerClientProtocols } from './logger-client.protocols';

@Module({
  providers: [LoggerClientProtocols],
  exports: [LoggerClientProtocols],
})
export class LoggerClientModule {}
