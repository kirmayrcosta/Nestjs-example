import {Test, TestingModule} from '@nestjs/testing';
import {DynamicModule} from '@nestjs/common';
import {fakerDE as faker} from '@faker-js/faker';
import {CreateCurrencyController} from "../../../../src/infra/controller/currency/create-currency.controller";
import {LoggerClientModule} from "../../../../src/infra/protocols/logger/logger-client.module";
import {UpdateCurrencyController} from "../../../../src/infra/controller/currency/update-currency.controller";
import {UpdateCurrecyUseCase} from "../../../../src/usecases/update-currecy.usecase";
import {CreateCurrencyDto} from "../../../../src/infra/controller/currency/dto/create-currency.dto";

const UPDATE_CURRENCY_USE_CASE = 'UpdateCurrencyUseCase';

class UpdateCurrecyUseCaseMock {
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
                    provide: UPDATE_CURRENCY_USE_CASE,
                    useFactory: () => new UpdateCurrecyUseCaseMock(),
                },
            ],
            exports: [UPDATE_CURRENCY_USE_CASE],
        };
    }
}

describe('Given UpdateCurrencyController', () => {
    let updateCurrencyController;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UpdateCurrencyController],
            imports: [UseCaseFactoryModule.register(), LoggerClientModule],
        }).compile();
        updateCurrencyController = module.get<UpdateCurrencyController>(
            UpdateCurrencyController,
        );
    });

    it('When call to update Currency should return success', async () => {
        const alias = "BRL";
        const quoteDto = {alias: 'USD', value: 1};
        const createCurrencyDtoMock = {alias, quotes: [quoteDto]};

        const result = await updateCurrencyController.update(alias, createCurrencyDtoMock);
        expect(result).toEqual(undefined);
    });
});
