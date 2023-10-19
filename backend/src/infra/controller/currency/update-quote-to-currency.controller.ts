import { Controller, Body, Param, Inject, Put } from '@nestjs/common';
import { FactoryModule } from '../../../factory.module';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateQuoteToCurrencyUsecase } from '../../../usecases/update-quote-to-currency.usecase';
import { QuotesDto } from './dto/quotes.dto';

@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
@ApiBadRequestResponse({ description: 'Currency with invalid fields.' })
export class UpdateQuoteToCurrencyController {
  constructor(
    @Inject(FactoryModule.UPDATE_QUOTATION_TO_CURRENCY_USE_CASE)
    private readonly updateQuoteToCurrencyUsecase: UpdateQuoteToCurrencyUsecase,
  ) {}

  @Put('/:alias/quotes/:quoteAlias')
  async update(
    @Param('alias') alias: string,
    @Param('quoteAlias') quoteAlias: string,
    @Body() quote: QuotesDto,
  ) {
    return this.updateQuoteToCurrencyUsecase.exec(alias, quoteAlias, quote);
  }
}
