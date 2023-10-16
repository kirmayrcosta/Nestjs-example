import {ICurrencyRepository} from "../domain/repository/ICurrencyRepository";

export class DeleteCurrencyUseCase {

    constructor(private readonly currencyRepository: ICurrencyRepository) {}
    exec(alias: string){
        return this.currencyRepository.delete(alias)
    }
}