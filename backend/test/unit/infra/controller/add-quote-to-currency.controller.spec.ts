import { Test, TestingModule } from '@nestjs/testing';
import { DynamicModule } from '@nestjs/common';
import { AddQuoteToCurrencyController } from '../../../../src/infra/controller/currency/add-quote-to-currency.controller';
import { IAddQuoteToCurrencyUsecase } from '../../../../src/usecases/add-quote-to-currency.usecase';
import { QuotesDto } from '../../../../src/infra/controller/currency/dto/quotes.dto';
const ADD_QUOTATION_TO_CURRENCY_USE_CASE = 'AddQuotationToCurrencyUseCase';

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

class AddQuoteToCurrencyUseCaseMock implements IAddQuoteToCurrencyUsecase {
  exec(alias, input: QuotesDto): Promise<any> {
    return Promise.resolve(undefined);
  }
}

class UseCaseFactoryModule {
  static register(): DynamicModule {
    return {
      module: UseCaseFactoryModule,
      providers: [
        {
          inject: [],
          provide: ADD_QUOTATION_TO_CURRENCY_USE_CASE,
          useFactory: () => new AddQuoteToCurrencyUseCaseMock(),
        },
      ],
      exports: [ADD_QUOTATION_TO_CURRENCY_USE_CASE],
    };
  }
}

describe('Given addQuoteToCurrencyController', () => {
  let addQuoteToCurrencyController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddQuoteToCurrencyController],
      imports: [UseCaseFactoryModule.register()],
    }).compile();
    addQuoteToCurrencyController = module.get<AddQuoteToCurrencyController>(
      AddQuoteToCurrencyController,
    );
  });

  it('When call to add quote to currency Should return success', async () => {
    const alias = 'ABC';
    const quoteDto = { alias: 'USD', value: 1 };
    const result = await addQuoteToCurrencyController.create(alias, quoteDto);
    expect(result).toEqual(undefined);
  });
});
