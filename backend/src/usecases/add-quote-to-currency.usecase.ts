import {Injectable} from "@nestjs/common";
import {CreateCurrencyDto} from "../infra/controller/currency/dto/create-currency.dto";
import {Currency} from "../domain/entities/currency.entity";
import {ICurrencyRepository} from "../domain/repository/ICurrencyRepository";
import {QuotesDto} from "../infra/controller/currency/dto/quotes.dto";
import {Quote} from "../domain/entities/quote.entity";


export interface IAddQuoteToCurrencyUsecase{
    exec(alias, input: QuotesDto): Promise<any>
}

@Injectable()
export class AddQuoteToCurrencyUseCase implements IAddQuoteToCurrencyUsecase{

    constructor(
        private readonly currencyRepository: ICurrencyRepository
    ) {
    }

    async exec(alias, input: QuotesDto) {
        const currency = new Quote(input)
        const currencyCreated = await this.currencyRepository.addQuote(alias, currency)
        return currencyCreated;
    }
}
