import {ICurrencyRepository} from "../../domain/repository/ICurrencyRepository";
import {Injectable} from "@nestjs/common";
import {Currency} from "../../domain/entities/currency.entity";
import {InjectModel} from "@nestjs/mongoose";
import {CurrencyModel} from "../schema/currency.schema";
import {Model} from "mongoose";
import {Quote} from "../../domain/entities/quote.entity";

@Injectable()
export class CurrencyRepository implements ICurrencyRepository{

    constructor(@InjectModel('Currency') private currencyModel: Model<CurrencyModel>) {
    }
    async create(currency: Currency): Promise<any> {
        const newCurrency = await this.currencyModel.create(currency)
        return newCurrency;
    }

    async findAll(): Promise<Array<Currency>> {
        const currencies = await this.currencyModel.find()
        const currenciesList = []
        for (const {_id, alias, quotes} of currencies) {

            currenciesList.push(new Currency({
                idCurrency: _id.toString(),
                alias: alias,
                quotes: quotes
            }))
        }

        return currenciesList
    }

    async findByAlias(alias: string): Promise<Currency> {
        const currency = await this.currencyModel.findOne({alias: alias}).exec()
        return new Currency({
            idCurrency: currency._id.toString(),
            alias: currency.alias,
            quotes: currency.quotes
        })

    }

    async findById(alias: string): Promise<Currency> {
        const currency = await this.currencyModel.findOne({alias: alias}).exec()

        return new Currency({
            idCurrency: currency._id.toString(),
            alias: currency.alias,
            quotes: currency.quotes

        })
    }

    async update(alias: string, currency: Currency): Promise<any> {
        const result = await this.currencyModel.findOneAndUpdate(
            {alias: alias},
            currency
        ).exec()

        return result;
    }

    async delete(alias: string): Promise<any> {
        const result = await this.currencyModel.findOneAndDelete(
            {alias: alias}
        ).exec()

        return result;
    }

    async addQuote(alias: string, quote: any): Promise<any> {
        const result = await this.currencyModel.updateOne(
            {alias: alias},
            {$push: {quotes: quote}}
        )
        return result;
    }

    async removeQuote(alias: string, quoteAlias: string): Promise<any> {
        const result = await this.currencyModel.updateOne(
            {alias: alias},
            {$pull: {quotes: {alias: quoteAlias}}}
        )
        return result;
    }

    async updateQuote(alias: string,quoteAlias: string ,quote: Quote): Promise<any> {
        const result = await this.currencyModel.updateOne(
            {alias: alias, "quotes.alias": quoteAlias},
            {$set: {
                "quotes.$.price": quote.price
            }
            }
        )
        return result
    }
}