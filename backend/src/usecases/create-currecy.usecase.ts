import {Injectable} from "@nestjs/common";
import {CreateCurrencyDto} from "../infra/controller/currency/dto/create-currency.dto";
import {Currency} from "../domain/entities/currency.entity";
import {ICurrencyRepository} from "../domain/repository/ICurrencyRepository";


@Injectable()
export class CreateCurrecyUseCase {

    constructor(
        private readonly currencyRepository: ICurrencyRepository
    ) {
    }

    async exec(input: CreateCurrencyDto) {
        const currency = new Currency(input)
        const currencyCreated = await this.currencyRepository.create(currency)
        return currencyCreated;
    }
}
