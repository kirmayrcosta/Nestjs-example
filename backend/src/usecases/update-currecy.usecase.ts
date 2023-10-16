import {Injectable} from "@nestjs/common";
import {CreateCurrencyDto} from "../infra/controller/currency/dto/create-currency.dto";
import {Currency} from "../domain/entities/currency.entity";
import {ICurrencyRepository} from "../domain/repository/ICurrencyRepository";


@Injectable()
export class UpdateCurrecyUseCase {

    constructor(
        private readonly currencyRepository: ICurrencyRepository
    ) {
    }

    async exec(alias, input: CreateCurrencyDto) {
        const currency = new Currency(input)
        const currencyUpdated = await this.currencyRepository.update(alias,currency)
        return currencyUpdated;
    }
}
