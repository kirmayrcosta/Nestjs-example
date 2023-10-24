import { Test, TestingModule } from '@nestjs/testing';
import { DynamicModule } from '@nestjs/common';

import { LoggerClientModule } from '../../../../src/infra/protocols/logger/logger-client.module';
import { RemoveQuoteToCurrencyController } from '../../../../src/infra/controller/currency/remove-quote-to-currency.controller';

const REMOVE_QUOTATION_TO_CURRENCY_USE_CASE =
  'RemoveQuotationToCurrencyUseCase';

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
class RemoveQuoteToCurrencyUsecaseMock {
  // eslint-disable-line @typescript-eslint/no-unused-vars
  exec(input, alias): Promise<any> {
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
          provide: REMOVE_QUOTATION_TO_CURRENCY_USE_CASE,
          useFactory: () => new RemoveQuoteToCurrencyUsecaseMock(),
        },
      ],
      exports: [REMOVE_QUOTATION_TO_CURRENCY_USE_CASE],
    };
  }
}

describe('Given RemoveQuoteToCurrencyController', () => {
  let removeQuoteToCurrencyController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoveQuoteToCurrencyController],
      imports: [UseCaseFactoryModule.register(), LoggerClientModule],
    }).compile();
    removeQuoteToCurrencyController =
      module.get<RemoveQuoteToCurrencyController>(
        RemoveQuoteToCurrencyController,
      );
  });

  it('When call to remove quote to Currency should return success', async () => {
    const alias = 'DEL';
    const quoteAlias = 'USD';
    const result = await removeQuoteToCurrencyController.remove(
      alias,
      quoteAlias,
    );
    expect(result).toEqual(undefined);
  });
});
