import {Injectable} from "@nestjs/common";
import {CreateCurrencyDto} from "../infra/controller/currency/dto/create-currency.dto";
import {Currency} from "../domain/entities/currency.entity";
import {ICurrencyRepository} from "../domain/repository/ICurrencyRepository";
import {QuotesDto} from "../infra/controller/currency/dto/quotes.dto";
import {Quote} from "../domain/entities/quote.entity";


@Injectable()
export class AddQuoteToCurrencyUseCase {

    constructor(
        private readonly currencyRepository: ICurrencyRepository
    ) {
    }

    async exec(alias: string, input: QuotesDto) {
        const quote = new Quote(input)
        const quoteCreated = await this.currencyRepository.addQuote(alias, quote);
        return quoteCreated;
    }
}
