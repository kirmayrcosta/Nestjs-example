import { Controller, Get, Inject } from '@nestjs/common';
import { GetAllCurrencyUseCase } from '../../../usecases/get-all-currency.usecase';
import { FactoryModule } from '../../../factory.module';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class GetAllCurrencyController {
  constructor(
    @Inject(FactoryModule.GET_ALL_CURRENCY_USE_CASE)
    private readonly getAllCurrencyUseCase: GetAllCurrencyUseCase,
  ) {}

  @Get()
  get() {
    return this.getAllCurrencyUseCase.exec();
  }
}
