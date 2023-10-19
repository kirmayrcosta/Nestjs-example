import { BadRequestException, Injectable } from '@nestjs/common';
import { ICurrencyRepository } from '../domain/repository/ICurrencyRepository';

@Injectable()
export class RemoveQuoteToCurrencyUsecase {
  constructor(private readonly currencyRepository: ICurrencyRepository) {}

  async exec(alias: string, quoteAlias: string) {
    const getCurrency = await this.currencyRepository.findByAlias(alias);

    if (!getCurrency) {
      throw new BadRequestException('Currency not found');
    }

    if (!getCurrency.quotes.find((quote) => quote.alias === quoteAlias)) {
      throw new BadRequestException('Currency not found');
    }
    await this.currencyRepository.removeQuote(alias, quoteAlias);
  }
}
