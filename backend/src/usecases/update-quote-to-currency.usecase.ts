import { BadRequestException, Injectable } from '@nestjs/common';
import { ICurrencyRepository } from '../domain/repository/ICurrencyRepository';
import { QuotesDto } from '../infra/controller/currency/dto/quotes.dto';
import { Quote } from '../domain/entities/quote.entity';

@Injectable()
export class UpdateQuoteToCurrencyUsecase {
  constructor(private readonly currencyRepository: ICurrencyRepository) {}

  async exec(alias: string, quoteAlias: string, input: QuotesDto) {
    const quote = new Quote(input);

    const getCurrency = await this.currencyRepository.findByAlias(alias);
    if (!getCurrency) {
      throw new BadRequestException('Currency not found');
    }

    if (!getCurrency.quotes.find((quote) => quote.alias === quoteAlias)) {
      throw new BadRequestException('Quote not found');
    }

    await this.currencyRepository.updateQuote(alias, quoteAlias, quote);
  }
}
