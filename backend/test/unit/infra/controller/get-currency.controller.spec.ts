import {Test, TestingModule} from '@nestjs/testing';
import {DynamicModule} from '@nestjs/common';
import {fakerDE as faker} from '@faker-js/faker';
import {CreateCurrencyController} from "../../../../src/infra/controller/currency/create-currency.controller";
import {LoggerClientModule} from "../../../../src/infra/protocols/logger/logger-client.module";
import {GetAllCurrencyController} from "../../../../src/infra/controller/currency/get-all-currency.controller";
import {GetCurrencyUseCase} from "../../../../src/usecases/get-currency.usecase";
import {GetCurrencyController} from "../../../../src/infra/controller/currency/get-currency.controller";

const GET_CURRENCY_USE_CASE = 'GetCurrencyUseCase';

const mock = [
    {
        "alias": "ABD",
        "name": "",
        "quotes": [
            {
                "alias": "USD",
                "price": 5.0557
            },
            {
                "alias": "BRL",
                "price": 4
            },
        ]
    }
]

class GetCurrencyUseCaseMock {
    exec(input): Promise<any> {
        return Promise.resolve(mock);
    }
}
class UseCaseFactoryModule {

    static register(): DynamicModule {
        return {
            module: UseCaseFactoryModule,
            imports: [LoggerClientModule],
            providers: [
                {
                    inject: [],
                    provide: GET_CURRENCY_USE_CASE,
                    useFactory: () => new GetCurrencyUseCaseMock(),
                },
            ],
            exports: [GET_CURRENCY_USE_CASE],
        };
    }
}

describe('GetCurrencyController', () => {
    let getCurrencyController;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GetCurrencyController],
            imports: [UseCaseFactoryModule.register(), LoggerClientModule],
        }).compile();
        getCurrencyController = module.get<GetCurrencyController>(
            GetCurrencyController,
        );
    });

    it('When call to get Currencies should return a list of currencies', async () => {
        const result = await getCurrencyController.find("BRL");
        expect(result).toEqual(mock);
    });
});
