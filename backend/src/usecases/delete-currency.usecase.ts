import { ICurrencyRepository } from '../domain/repository/ICurrencyRepository';
import { BadRequestException } from '@nestjs/common';

export class DeleteCurrencyUseCase {
  constructor(private readonly currencyRepository: ICurrencyRepository) {}
  async exec(alias: string) {
    const getCurrency = await this.currencyRepository.findByAlias(alias);

    if (!getCurrency) {
      throw new BadRequestException('Currency not found');
    }
    return this.currencyRepository.delete(alias);
  }
}
