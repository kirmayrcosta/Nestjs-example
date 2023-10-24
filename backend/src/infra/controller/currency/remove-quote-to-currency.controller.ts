import { Controller, Param, Delete, Inject } from '@nestjs/common';
import { FactoryModule } from '../../../factory.module';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RemoveQuoteToCurrencyUsecase } from '../../../usecases/remove-quote-to-currency.usecase';

@Controller('v1/currency')
@ApiTags('currency')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiBadRequestResponse({ description: 'Currency with invalid param' })
@ApiNoContentResponse({ description: 'Alias deleted with success' })
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
