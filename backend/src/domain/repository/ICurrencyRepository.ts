import { Currency } from '../entities/currency.entity';

export interface ICurrencyRepository {
  create(currency: any): Promise<any>;
  findAll(): Promise<any>;
  findByAlias(alias: string): Promise<Currency>;
  findById(alias: string): Promise<Currency>;
  update(alias: string, currency: Currency): Promise<any>;
  delete(alias: string): Promise<any>;
  addQuote(alias: string, quote: any): Promise<any>;
  removeQuote(alias: string, quoteAlias: string): Promise<any>;
  updateQuote(alias: string, quoteAlias: string, quote: any): Promise<any>;
}
