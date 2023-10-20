import {Test, TestingModule} from '@nestjs/testing';
import {DynamicModule} from '@nestjs/common';
import {CreateCurrencyController} from "../../../../src/infra/controller/currency/create-currency.controller";
import {LoggerClientModule} from "../../../../src/infra/protocols/logger/logger-client.module";

const CREATE_CURRENCY_USE_CASE = 'CreateCurrencyUseCase';

class CreateCurrencyUseCaseMock {
    exec(input): Promise<any> {
        return Promise.resolve(input);
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
                    provide: CREATE_CURRENCY_USE_CASE,
                    useFactory: () => new CreateCurrencyUseCaseMock(),
                },
            ],
            exports: [CREATE_CURRENCY_USE_CASE],
        };
    }
}

describe('CreateCurrencyController', () => {
    let createCurrencyController;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CreateCurrencyController],
            imports: [UseCaseFactoryModule.register(), LoggerClientModule],
        }).compile();
        createCurrencyController = module.get<CreateCurrencyController>(
            CreateCurrencyController,
        );
    });

    it('When call to create Currency should return success', async () => {
        const correlationId = '123';
        const requestId = '123';
        const alias = "BRL";
        const quoteDto = {alias: 'USD', value: 1};
        const createCurrencyDtoMock = {alias, quotes: [quoteDto]};

        const result = await createCurrencyController.create(correlationId,requestId, createCurrencyDtoMock);
        expect(result).toEqual(createCurrencyDtoMock);
    });
});
