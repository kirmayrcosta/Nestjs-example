import { ICurrencyRepository } from '../../domain/repository/ICurrencyRepository';
import { Currency } from '../../domain/entities/currency.entity';

export class CurrencyRepositoryMock implements ICurrencyRepository {
  addQuote(alias: string, quote: any): Promise<any> {
    return Promise.resolve('sucesso');
  }

  create(currency: any): Promise<any> {
    return Promise.resolve(undefined);
  }

  delete(alias: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  findAll(): Promise<any> {
    return Promise.resolve(undefined);
  }

  findByAlias(alias: string): Promise<Currency> {
    return Promise.resolve(undefined);
  }

  findById(alias: string): Promise<Currency> {
    return Promise.resolve(undefined);
  }

  removeQuote(alias: string, quoteAlias: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  update(alias: string, currency: Currency): Promise<any> {
    return Promise.resolve(undefined);
  }

  updateQuote(alias: string, quoteAlias: string, quote: any): Promise<any> {
    return Promise.resolve(undefined);
  }
}
