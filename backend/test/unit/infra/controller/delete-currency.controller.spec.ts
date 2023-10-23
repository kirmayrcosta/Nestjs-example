import { Test, TestingModule } from '@nestjs/testing';
import { DynamicModule } from '@nestjs/common';
import { LoggerClientModule } from '../../../../src/infra/protocols/logger/logger-client.module';
import { DeleteCurrencyController } from '../../../../src/infra/controller/currency/delete-currency.controller';

const DELETE_CURRENCY_USE_CASE = 'DeleteCurrencyUseCase';

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

class DeleteCurrencyUseCaseMock {
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
          provide: DELETE_CURRENCY_USE_CASE,
          useFactory: () => new DeleteCurrencyUseCaseMock(),
        },
      ],
      exports: [DELETE_CURRENCY_USE_CASE],
    };
  }
}

describe('DeleteCurrencyController', () => {
  let deleteCurrencyController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteCurrencyController],
      imports: [UseCaseFactoryModule.register(), LoggerClientModule],
    }).compile();
    deleteCurrencyController = module.get<DeleteCurrencyController>(
      DeleteCurrencyController,
    );
  });

  it('When call to create Currency should return success', async () => {
    const alias = 'DEL';
    const result = await deleteCurrencyController.remove(alias);
    expect(result).toEqual(undefined);
  });
});
