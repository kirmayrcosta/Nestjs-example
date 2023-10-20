import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FactoryModule } from './factory.module';
import { ConfigModule } from '@nestjs/config';

import { ControllerModule } from './infra/controller/controller.module';
import { EnvConfigModule } from './infra/config/env-config.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/currency'),
    FactoryModule.register(),
    ConfigModule.forRoot(),
    EnvConfigModule,
    ControllerModule,
  ],
})
export class AppModule {}
