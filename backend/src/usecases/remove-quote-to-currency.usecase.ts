import { Injectable } from '@nestjs/common';
import { ICurrencyRepository } from '../domain/repository/ICurrencyRepository';

@Injectable()
export class RemoveQuoteToCurrencyUsecase {
  constructor(private readonly currencyRepository: ICurrencyRepository) {}

  async exec(alias: string, quoteAlias: string) {
    await this.currencyRepository.removeQuote(alias, quoteAlias);
  }
}
