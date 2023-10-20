import { Module } from '@nestjs/common';
import { LoggerClientProtocols } from './logger-client.protocols';
import { EnvConfigModule } from '../../config/env-config.module';

@Module({
  imports: [EnvConfigModule],
  providers: [LoggerClientProtocols],
  exports: [LoggerClientProtocols],
})
export class LoggerClientModule {}
