import { ICurrencyRepository } from '../domain/repository/ICurrencyRepository';

export class ConverterCurrencyToPriceUseCase {
  constructor(private readonly currencyRepository: ICurrencyRepository) {}

  async exec(alias: string, price: number) {
    const currency = await this.currencyRepository.findByAlias(alias);

    return currency.toPrice(price);
  }
}
