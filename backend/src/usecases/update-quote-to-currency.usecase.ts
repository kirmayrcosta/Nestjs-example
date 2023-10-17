import { Injectable } from '@nestjs/common';
import { ICurrencyRepository } from '../domain/repository/ICurrencyRepository';
import { QuotesDto } from '../infra/controller/currency/dto/quotes.dto';
import { Quote } from '../domain/entities/quote.entity';

@Injectable()
export class UpdateQuoteToCurrencyUsecase {
  constructor(private readonly currencyRepository: ICurrencyRepository) {}

  async exec(alias: string, quoteAlias: string, input: QuotesDto) {
    const quote = new Quote(input);
    const quoteCreated = await this.currencyRepository.updateQuote(
      alias,
      quoteAlias,
      quote,
    );
    return quoteCreated;
  }
}
