import { Module } from '@nestjs/common';
import databaseMock from './db-teste-module';
import { ControllerModule } from '../../../src/infra/controller/controller.module';

import { FactoryModule } from '../../../src/factory.module';
import {ConfigModule} from "@nestjs/config";
import {EnvConfigModule} from "../../../src/infra/config/env-config.module";
import {CacheModule} from "@nestjs/cache-manager";
import {redisStore} from "cache-manager-redis-store";

@Module({
  imports: [
    databaseMock({
      connectionName: (new Date().getTime() * Math.random()).toString(16),
    }),
    EnvConfigModule,
    CacheModule.register({isGlobal: true}),
    FactoryModule.register(),
    ControllerModule,
  ],
})
export class AppModuleMock {}
