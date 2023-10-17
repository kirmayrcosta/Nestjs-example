import { ICurrencyRepository } from '../domain/repository/ICurrencyRepository';

export class GetCurrencyUseCase {
  constructor(private readonly currencyRepository: ICurrencyRepository) {}
  exec(alias: string) {
    return this.currencyRepository.findById(alias);
  }
}
