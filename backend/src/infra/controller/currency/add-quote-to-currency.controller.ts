import { Controller, Post, Body, Param, Inject } from '@nestjs/common';
import { FactoryModule } from '../../../factory.module';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuotesDto } from './dto/quotes.dto';
import { AddQuoteToCurrencyUseCase } from '../../../usecases/add-quote-to-currency.usecase';

@Controller('v1/currency')
@ApiTags('currency')
@ApiResponse({ status: 500, description: 'Internal Server Error' })
export class AddQuoteToCurrencyController {
  constructor(
    @Inject(FactoryModule.ADD_QUOTATION_TO_CURRENCY_USE_CASE)
    private readonly addQuoteToCurrencyUseCase: AddQuoteToCurrencyUseCase,
  ) {}

  @Post('/:alias/quotes')
  async create(@Param('alias') alias: string, @Body() quoteDto: QuotesDto) {
    const currency = await this.addQuoteToCurrencyUseCase.exec(alias, quoteDto);
    return currency;
  }
}
