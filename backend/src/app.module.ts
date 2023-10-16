import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {FactoryModule} from "./factory.module";
import {ControllerModule} from "./infra/controller/controller.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/currency'),
    FactoryModule.register(),
    ControllerModule
  ]
})
export class AppModule {}
