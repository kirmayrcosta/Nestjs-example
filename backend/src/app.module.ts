import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FactoryModule } from './factory.module';
import { ControllerModule } from './infra/controller/controller.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/currency'),
    FactoryModule.register(),
    ConfigModule.forRoot(),
    ControllerModule,
  ],
})
export class AppModule {}
