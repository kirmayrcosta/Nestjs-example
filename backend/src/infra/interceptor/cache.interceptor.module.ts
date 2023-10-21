import { Module } from '@nestjs/common';
import { CacheInterceptor } from './cache.interceptor';
import { LoggerClientModule } from '../protocols/logger/logger-client.module';

@Module({
  providers: [CacheInterceptor],
  exports: [CacheInterceptor],
  imports: [LoggerClientModule],
})
export class CacheInterceptorModule {}
