import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FactoryModule } from './factory.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ControllerModule } from './infra/controller/controller.module';
import { EnvConfigModule } from './infra/config/env-config.module';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CacheModule.register({
      isGlobal: true,
      store: redisStore as any,
        url: process.env.EXPORTER_CACHE_URL,
    }),
    FactoryModule.register(),
    ConfigModule.forRoot(),
    EnvConfigModule,
    ControllerModule,
  ],
})
export class AppModule {}
