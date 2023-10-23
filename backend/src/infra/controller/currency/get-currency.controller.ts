import {
  Controller,
  Get,
  Param,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { FactoryModule } from '../../../factory.module';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrencyUseCase } from '../../../usecases/get-currency.usecase';
import { CacheInterceptor } from '../../interceptor/cache.interceptor';


@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class GetCurrencyController {
  constructor(
    @Inject(FactoryModule.GET_CURRENCY_USE_CASE)
    private readonly getCurrencyUseCase: GetCurrencyUseCase,
  ) {}

  @Get(':alias')
  @UseInterceptors(CacheInterceptor)
  find(@Param('alias') alias: string) {
    return this.getCurrencyUseCase.exec(alias);
  }
}
