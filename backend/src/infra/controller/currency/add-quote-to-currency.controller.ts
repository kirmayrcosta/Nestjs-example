import { Controller, Post, Body, Param, Inject } from '@nestjs/common';
import { FactoryModule } from '../../../factory.module';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuotesDto } from './dto/quotes.dto';
import { AddQuoteToCurrencyUseCase } from '../../../usecases/add-quote-to-currency.usecase';

@Controller('v1/currency')
@ApiTags('currency')
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiBadRequestResponse({ description: 'Bad Request' })
export class AddQuoteToCurrencyController {
  constructor(
    @Inject(FactoryModule.ADD_QUOTATION_TO_CURRENCY_USE_CASE)
    private readonly addQuoteToCurrencyUseCase: AddQuoteToCurrencyUseCase,
  ) {}

  @Post('/:alias/quotes')
  async create(@Param('alias') alias: string, @Body() quoteDto: QuotesDto) {
    return this.addQuoteToCurrencyUseCase.exec(alias, quoteDto);
  }
}
