import { BadRequestException, Injectable } from '@nestjs/common';
import { ICurrencyRepository } from '../domain/repository/ICurrencyRepository';
import { QuotesDto } from '../infra/controller/currency/dto/quotes.dto';
import { Quote } from '../domain/entities/quote.entity';

export interface IAddQuoteToCurrencyUsecase {
  exec(alias, input: QuotesDto): Promise<any>;
}

@Injectable()
export class AddQuoteToCurrencyUseCase implements IAddQuoteToCurrencyUsecase {
  constructor(private readonly currencyRepository: ICurrencyRepository) {}

  async exec(alias, input: QuotesDto) {
    const currency = new Quote(input);
    const getCurrency = await this.currencyRepository.findByAlias(alias);

    if (!getCurrency) {
      throw new BadRequestException('Currency not found');
    }

    if (getCurrency.quotes.find((quote) => quote.alias === currency.alias)) {
      throw new BadRequestException('Quote already exists');
    }

    const currencyCreated = await this.currencyRepository.addQuote(
      alias,
      currency,
    );
    return currencyCreated;
  }
}
