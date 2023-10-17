import { Controller, Param, Delete, Inject } from '@nestjs/common';
import { FactoryModule } from '../../../factory.module';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RemoveQuoteToCurrencyUsecase } from '../../../usecases/remove-quote-to-currency.usecase';

@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class RemoveQuoteToCurrencyController {
  constructor(
    @Inject(FactoryModule.REMOVE_QUOTATION_TO_CURRENCY_USE_CASE)
    private readonly removeQuoteToCurrencyUsecase: RemoveQuoteToCurrencyUsecase,
  ) {}

  @Delete('/:alias/quotes/:quoteAlias')
  remove(
    @Param('alias') alias: string,
    @Param('quoteAlias') quoteAlias: string,
  ) {
    return this.removeQuoteToCurrencyUsecase.exec(alias, quoteAlias);
  }
}
