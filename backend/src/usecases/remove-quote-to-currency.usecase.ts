import { Injectable } from '@nestjs/common';
import { ICurrencyRepository } from '../domain/repository/ICurrencyRepository';
import { Quote } from '../domain/entities/quote.entity';

@Injectable()
export class RemoveQuoteToCurrencyUsecase {
  constructor(private readonly currencyRepository: ICurrencyRepository) {}

  async exec(alias: string, quoteAlias: string) {
    const quote = new Quote({
      alias: quoteAlias,
    });
    const currencyCreated = await this.currencyRepository.removeQuote(
      alias,
      quote.alias,
    );
    return currencyCreated;
  }
}
