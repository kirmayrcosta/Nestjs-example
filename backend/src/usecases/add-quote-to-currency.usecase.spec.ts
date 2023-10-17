

import {ICurrencyRepository} from "../domain/repository/ICurrencyRepository";
import {Currency} from "../domain/entities/currency.entity";
import {CreateCurrencyDto} from "../infra/controller/currency/dto/create-currency.dto";
import {QuotesDto} from "../infra/controller/currency/dto/quotes.dto";
import {AddQuoteToCurrencyUseCase} from "./add-quote-to-currency.usecase";


class currencyMock implements ICurrencyRepository{
    addQuote(alias: string, quote: any): Promise<any> {
        return Promise.resolve("sucesso");
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

describe('AddQuoteToCurrencyUseCase', () => {
    let addQuoteToCurrencyUseCase: AddQuoteToCurrencyUseCase;
    beforeEach(async () => {

        addQuoteToCurrencyUseCase = new AddQuoteToCurrencyUseCase(new currencyMock());

    });

    it('should be defined', async () => {
        const input = new QuotesDto();
        input.alias = 'USD';
        input.price = 1;

        const result = await addQuoteToCurrencyUseCase.exec('ABC', input);
        expect(result).toBe('sucesso')
    });
});