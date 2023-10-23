import { Test, TestingModule } from '@nestjs/testing';
import { DynamicModule } from '@nestjs/common';

import { LoggerClientModule } from '../../../../src/infra/protocols/logger/logger-client.module';
import { GetAllCurrencyController } from '../../../../src/infra/controller/currency/get-all-currency.controller';


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

jest.mock("../../../../src/infra/interceptor/cache.interceptor", () => {
    return {
        CacheInterceptor: jest.fn().mockImplementation(() => {
        return {
            intercept: jest.fn(),
        };
        }),
    };
})

const GET_ALL_CURRENCY_USE_CASE = 'GetAllCurrencyUseCase';

const mock = [
  {
    alias: 'ABD',
    name: '',
    quotes: [
      {
        alias: 'USD',
        price: 5.0557,
      },
      {
        alias: 'BRL',
        price: 4,
      },
    ],
  },
];

class CreateCurrencyUseCaseMock {
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
          provide: GET_ALL_CURRENCY_USE_CASE,
          useFactory: () => new CreateCurrencyUseCaseMock(),
        },
      ],
      exports: [GET_ALL_CURRENCY_USE_CASE],
    };
  }
}

describe('GetAllCurrencyController', () => {
  let getAllCurrencyController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetAllCurrencyController],
      imports: [UseCaseFactoryModule.register(), LoggerClientModule],
    }).compile();
    getAllCurrencyController = module.get<GetAllCurrencyController>(
      GetAllCurrencyController,
    );
  });

  it('When call to get Currencies should return a list of currencies', async () => {
    const result = await getAllCurrencyController.get();
    expect(result).toEqual(mock);
  });
});
