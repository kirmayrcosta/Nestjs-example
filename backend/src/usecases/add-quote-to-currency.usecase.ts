import {Injectable} from "@nestjs/common";
import {CreateCurrencyDto} from "../infra/controller/currency/dto/create-currency.dto";
import {Currency} from "../domain/entities/currency.entity";
import {ICurrencyRepository} from "../domain/repository/ICurrencyRepository";


@Injectable()
export class AddQuoteToCurrencyUsecase {

    constructor(
        private readonly currencyRepository: ICurrencyRepository
    ) {
    }

    async exec(alias, input: CreateCurrencyDto) {
        const currency = new Currency(input)
        const currencyCreated = await this.currencyRepository.addQuote(alias, currency)
        return currencyCreated;
    }
}
