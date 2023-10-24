import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { GetAllCurrencyUseCase } from '../../../usecases/get-all-currency.usecase';
import { FactoryModule } from '../../../factory.module';
import {
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CacheInterceptor } from '../../interceptor/cache.interceptor';

@Controller('v1/currency')
@ApiTags('currency')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiNoContentResponse({ description: 'List of Currency with success' })
export class GetAllCurrencyController {
  constructor(
    @Inject(FactoryModule.GET_ALL_CURRENCY_USE_CASE)
    private readonly getAllCurrencyUseCase: GetAllCurrencyUseCase,
  ) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  get() {
    return this.getAllCurrencyUseCase.exec();
  }
}
