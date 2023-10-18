import { ICurrencyRepository } from '../../domain/repository/ICurrencyRepository';
import { Injectable } from '@nestjs/common';
import { Currency } from '../../domain/entities/currency.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CurrencyModel } from '../schema/currency.schema';
import { Model } from 'mongoose';
import { Quote } from '../../domain/entities/quote.entity';
import { QuoteModel } from '../schema/quote.schema';

@Injectable()
export class CurrencyRepository implements ICurrencyRepository {
  constructor(
    @InjectModel('Currency') private currencyModel: Model<CurrencyModel>,
  ) {}
  async create(currency: Currency): Promise<Currency> {
    const newCurrency = await this.currencyModel.create(currency);
    return new Currency({
      name: newCurrency.name,
      alias: newCurrency.alias,
      quotes: newCurrency.quotes,
    });
  }

  async findAll(): Promise<Array<Currency>> {
    const currencies = await this.currencyModel.find();
    const currenciesList = [];
    for (const { _id, alias, quotes } of currencies) {
      currenciesList.push(
        new Currency({
          idCurrency: _id.toString(),
          alias: alias,
          quotes: quotes,
        }),
      );
    }

    return currenciesList;
  }

  async findByAlias(alias: string): Promise<Currency> {
    const currency = await this.currencyModel.findOne({ alias: alias });

    if (!currency) {
      return undefined;
    }

    return new Currency({
      alias: currency.alias,
      name: currency.name,
      quotes: currency.quotes,
    });
  }

  async update(alias: string, currency: Currency): Promise<any> {
    await this.currencyModel.findOneAndUpdate({ alias: alias }, currency);
  }

  async delete(alias: string): Promise<any> {
    await this.currencyModel.findOneAndDelete({ alias: alias });
  }

  async addQuote(alias: string, quote: any): Promise<any> {
    const quoteToUpdate: QuoteModel = {
      alias: quote.alias,
      price: quote.price,
    };
    await this.currencyModel.updateOne(
      { alias: alias },
      { $push: { quotes: quoteToUpdate } },
    );
  }

  async removeQuote(alias: string, quoteAlias: string): Promise<any> {
    await this.currencyModel.updateOne(
      { alias: alias },
      { $pull: { quotes: { alias: quoteAlias } } },
    );
  }

  async updateQuote(
    alias: string,
    quoteAlias: string,
    quote: Quote,
  ): Promise<any> {
    await this.currencyModel.updateOne(
      { alias: alias, 'quotes.alias': quoteAlias },
      {
        $set: {
          'quotes.$.price': quote.price,
        },
      },
    );
  }
}
