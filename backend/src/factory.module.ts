import {DynamicModule, Module} from '@nestjs/common';
import {HealthCheckUseCase} from "./usecases/health-check.usecase";
import {CreateCurrecyUseCase} from "./usecases/create-currecy.usecase";
import {GetAllCurrencyUseCase} from "./usecases/get-all-currency.usecase";
import {CurrencyRepository} from "./infra/repository/currency.repository";
import {RepositoriesModule} from "./infra/repository/repositories.module";
import {ConverterCurrencyToPriceUseCase} from "./usecases/converter-currency-to-price.usecase";
import {GetCurrencyUseCase} from "./usecases/get-currency.usecase";
import {UpdateCurrecyUseCase} from "./usecases/update-currecy.usecase";
import {DeleteCurrencyUseCase} from "./usecases/delete-currency.usecase";
import {RemoveQuoteToCurrencyUsecase} from "./usecases/remove-quote-to-currency.usecase";

import {UpdateQuoteToCurrencyUsecase} from "./usecases/update-quote-to-currency.usecase";
import {AddQuoteToCurrencyUseCase} from "./usecases/add-quote-to-currency.usecase";

@Module({
    imports: [
        RepositoriesModule
    ],
})
export class FactoryModule {

    static HEALTH_CHECK_USE_CASE = 'HealthCheckUseCase';
    static CREATE_CURRENCY_USE_CASE = 'CreateCurrencyUseCase';
    static GET_ALL_CURRENCY_USE_CASE = 'GetAllCurrencyUseCase';
    static GET_CURRENCY_USE_CASE = 'GetCurrencyUseCase';
    static CONVERTER_CURRENCY_TO_PRICE_USE_CASE = 'ConverterCurrencyToPriceUseCase';
    static UPDATE_CURRENCY_USE_CASE = 'UpdateCurrencyUseCase';
    static DELETE_CURRENCY_USE_CASE = 'DeleteCurrencyUseCase';
    static ADD_QUOTATION_TO_CURRENCY_USE_CASE = 'AddQuotationToCurrencyUseCase';
    static UPDATE_QUOTATION_TO_CURRENCY_USE_CASE = 'UpdateQuotationToCurrencyUseCase';
    static REMOVE_QUOTATION_TO_CURRENCY_USE_CASE = 'RemoveQuotationToCurrencyUseCase';


    static register (): DynamicModule {
        return {
            module: FactoryModule,
            providers: [{
                provide: FactoryModule.HEALTH_CHECK_USE_CASE,
                useFactory: () => new HealthCheckUseCase(),

            },{
                provide: FactoryModule.CREATE_CURRENCY_USE_CASE,
                inject: [CurrencyRepository],
                useFactory: (
                    currencyRepository: CurrencyRepository
                ) => new CreateCurrecyUseCase(currencyRepository),
            },{
                inject: [CurrencyRepository],
                provide: FactoryModule.GET_ALL_CURRENCY_USE_CASE,
                useFactory: (currencyRepository: CurrencyRepository) => new GetAllCurrencyUseCase(currencyRepository),
            },
            {
                inject: [CurrencyRepository],
                provide: FactoryModule.CONVERTER_CURRENCY_TO_PRICE_USE_CASE,
                useFactory: (currencyRepository: CurrencyRepository) => new ConverterCurrencyToPriceUseCase(currencyRepository),
            },
            {
                inject: [CurrencyRepository],
                provide: FactoryModule.GET_CURRENCY_USE_CASE,
                useFactory: (currencyRepository: CurrencyRepository) => new GetCurrencyUseCase(currencyRepository),
            },
            {
                inject: [CurrencyRepository],
                provide: FactoryModule.UPDATE_CURRENCY_USE_CASE,
                useFactory: (currencyRepository: CurrencyRepository) => new UpdateCurrecyUseCase(currencyRepository),
            },
            {
                inject: [CurrencyRepository],
                provide: FactoryModule.DELETE_CURRENCY_USE_CASE,
                useFactory: (currencyRepository: CurrencyRepository) => new DeleteCurrencyUseCase(currencyRepository),
            },
            {
                inject: [CurrencyRepository],
                provide: FactoryModule.REMOVE_QUOTATION_TO_CURRENCY_USE_CASE,
                useFactory: (currencyRepository: CurrencyRepository) => new RemoveQuoteToCurrencyUsecase(currencyRepository),
            },
            {
                inject: [CurrencyRepository],
                provide: FactoryModule.ADD_QUOTATION_TO_CURRENCY_USE_CASE,
                useFactory: (currencyRepository: CurrencyRepository) => new AddQuoteToCurrencyUseCase(currencyRepository),
            },
            {
                inject: [CurrencyRepository],
                provide: FactoryModule.UPDATE_QUOTATION_TO_CURRENCY_USE_CASE,
                useFactory: (currencyRepository: CurrencyRepository) => new UpdateQuoteToCurrencyUsecase(currencyRepository),
            },
            ],
            exports: [
                FactoryModule.HEALTH_CHECK_USE_CASE,
                FactoryModule.CREATE_CURRENCY_USE_CASE,
                FactoryModule.GET_ALL_CURRENCY_USE_CASE,
                FactoryModule.CONVERTER_CURRENCY_TO_PRICE_USE_CASE,
                FactoryModule.GET_CURRENCY_USE_CASE,
                FactoryModule.ADD_QUOTATION_TO_CURRENCY_USE_CASE,
                FactoryModule.REMOVE_QUOTATION_TO_CURRENCY_USE_CASE,
                FactoryModule.UPDATE_QUOTATION_TO_CURRENCY_USE_CASE,
                FactoryModule.UPDATE_CURRENCY_USE_CASE,
                FactoryModule.DELETE_CURRENCY_USE_CASE
            ]
        };
    }
}
