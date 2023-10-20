import { Module } from '@nestjs/common';
import databaseMock from './db-teste-module';
import { ControllerModule } from '../../../src/infra/controller/controller.module';
import { FactoryModule } from '../../../src/factory.module';

@Module({
  imports: [
    databaseMock({
      connectionName: (new Date().getTime() * Math.random()).toString(16),
    }),
    FactoryModule.register(),
    ControllerModule,
  ],
})
export class AppModuleMock {}
