import { Test, TestingModule } from '@nestjs/testing';
import { DynamicModule } from '@nestjs/common';

import { LoggerClientModule } from '../../../../src/infra/protocols/logger/logger-client.module';
import { ConverterCurrencyToPriceController } from '../../../../src/infra/controller/currency/converter-currency-to-price.controller';

const CONVERTER_CURRENCY_TO_PRICE_USE_CASE = 'ConverterCurrencyToPriceUseCase';

jest.mock("../../../../src/infra/interceptor/cache.interceptor", () => {
  return {
    CacheInterceptor: jest.fn().mockImplementation(() => {
      return {
        intercept: jest.fn(),
      };
    }),
  };
})

jest.mock(
    '../../../../src/infra/protocols/logger/logger-client.protocols',
    () => {
      return {
        LoggerClientProtocols: jest.fn().mockImplementation(() => {
          return {
            setCtx: jest.fn().mockReturnValue({}),
            log: jest.fn(),
          };
        }),
      };
    },
);

const resultMock = {
  alias: 'BRL',
  name: '',
  quotes: [
    {
      alias: 'USD',
      price: 10.1114,
    },
  ],
};

class CreateCurrencyUseCaseMock {
  exec(input): Promise<any> {
    return Promise.resolve(resultMock);
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
          provide: CONVERTER_CURRENCY_TO_PRICE_USE_CASE,
          useFactory: () => new CreateCurrencyUseCaseMock(),
        },
      ],
      exports: [CONVERTER_CURRENCY_TO_PRICE_USE_CASE],
    };
  }
}

describe('Given ConverterCurrencyToPriceController', () => {
  let converterCurrencyToPriceController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConverterCurrencyToPriceController],
      imports: [UseCaseFactoryModule.register(), LoggerClientModule],
    }).compile();
    converterCurrencyToPriceController =
      module.get<ConverterCurrencyToPriceController>(
        ConverterCurrencyToPriceController,
      );
  });

  it('When call to converter price to currency Should return success', async () => {
    const alias = 'BRL';
    const price = 2;

    const result = await converterCurrencyToPriceController.calc(alias, price);
    expect(result).toEqual(resultMock);
  });
});
