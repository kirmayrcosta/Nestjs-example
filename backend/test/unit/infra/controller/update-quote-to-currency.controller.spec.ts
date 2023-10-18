import {Test, TestingModule} from '@nestjs/testing';
import {DynamicModule} from '@nestjs/common';
import {fakerDE as faker} from '@faker-js/faker';
import {CreateCurrencyController} from "../../../../src/infra/controller/currency/create-currency.controller";
import {LoggerClientModule} from "../../../../src/infra/protocols/logger/logger-client.module";
import {UpdateCurrencyController} from "../../../../src/infra/controller/currency/update-currency.controller";
import {UpdateCurrecyUseCase} from "../../../../src/usecases/update-currecy.usecase";
import {CreateCurrencyDto} from "../../../../src/infra/controller/currency/dto/create-currency.dto";
import {
    UpdateQuoteToCurrencyController
} from "../../../../src/infra/controller/currency/update-quote-to-currency.controller";

const UPDATE_QUOTATION_TO_CURRENCY_USE_CASE = 'UpdateQuotationToCurrencyUseCase';

class UpdateQuotationToCurrencyUseCaseMock {
    exec(input): Promise<any> {
        return Promise.resolve(undefined);
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
                    provide: UPDATE_QUOTATION_TO_CURRENCY_USE_CASE,
                    useFactory: () => new UpdateQuotationToCurrencyUseCaseMock(),
                },
            ],
            exports: [UPDATE_QUOTATION_TO_CURRENCY_USE_CASE],
        };
    }
}

describe('Given UpdateQuoteToCurrencyController', () => {
    let updateQuoteToCurrencyController;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UpdateQuoteToCurrencyController],
            imports: [UseCaseFactoryModule.register(), LoggerClientModule],
        }).compile();
        updateQuoteToCurrencyController = module.get<UpdateQuoteToCurrencyController>(
            UpdateQuoteToCurrencyController,
        );
    });

    it('When call to update quote to Currency should return success', async () => {
        const alias = "BRL";
        const quoteDto = {alias: 'USD', value: 1};
        const createCurrencyDtoMock = {alias, quotes: [quoteDto]};

        const result = await updateQuoteToCurrencyController.update(alias, createCurrencyDtoMock);
        expect(result).toEqual(undefined);
    });
});
