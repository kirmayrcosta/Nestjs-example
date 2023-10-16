import {ICurrencyRepository} from "../domain/repository/ICurrencyRepository";

export class GetAllCurrencyUseCase {

    constructor(private readonly currencyRepository: ICurrencyRepository) {}
    exec(){
        return this.currencyRepository.findAll()
    }
}