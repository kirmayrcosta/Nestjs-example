import { Module } from '@nestjs/common';
import { FactoryModule } from '../../factory.module';
import { HealthCheckController } from './health-check.controller';
import { ConverterCurrencyToPriceController } from './currency/converter-currency-to-price.controller';
import { GetAllCurrencyController } from './currency/get-all-currency.controller';
import { GetCurrencyController } from './currency/get-currency.controller';
import { CreateCurrencyController } from './currency/create-currency.controller';
import { UpdateCurrencyController } from './currency/update-currency.controller';
import { DeleteCurrencyController } from './currency/delete-currency.controller';
import { AddQuoteToCurrencyController } from './currency/add-quote-to-currency.controller';
import { UpdateQuoteToCurrencyController } from './currency/update-quote-to-currency.controller';
import { RemoveQuoteToCurrencyController } from './currency/remove-quote-to-currency.controller';
import { LoggerClientModule } from '../protocols/logger/logger-client.module';
import { CacheInterceptorModule } from '../interceptor/cache.interceptor.module';

@Module({
  imports: [
    FactoryModule.register(),
    LoggerClientModule,
    CacheInterceptorModule,
  ],
  controllers: [
    HealthCheckController,
    ConverterCurrencyToPriceController,
    GetAllCurrencyController,
    GetCurrencyController,
    CreateCurrencyController,
    UpdateCurrencyController,
    DeleteCurrencyController,
    AddQuoteToCurrencyController,
    UpdateQuoteToCurrencyController,
    RemoveQuoteToCurrencyController,
  ],
})
export class ControllerModule {}
