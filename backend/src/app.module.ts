import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FactoryModule } from './factory.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ControllerModule } from './infra/controller/controller.module';
import { EnvConfigModule } from './infra/config/env-config.module';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CacheModule.register({
      isGlobal: true,
      store: redisStore as any,
      host: process.env.EXPORTER_LOG_ENDPOINT,
      port: process.env.EXPORTER_LOG_PORT,
    }),
    FactoryModule.register(),
    ConfigModule.forRoot(),
    EnvConfigModule,
    ControllerModule,
  ],
})
export class AppModule {}
