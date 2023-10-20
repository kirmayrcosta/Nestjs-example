import { QuotesDto } from '../../../src/infra/controller/currency/dto/quotes.dto';
import { CurrencyRepositoryMock } from '../mock/currencyRepository.mock';
import { CreateCurrecyUseCase } from '../../../src/usecases/create-currecy.usecase';
import { BadRequestException } from '@nestjs/common';
import { LoggerClientMock } from '../mock/loggerClientProtocols.mock';
import { CreateCurrencyDto } from '../../../src/infra/controller/currency/dto/create-currency.dto';

describe('Given CreateCurrecyUseCase', () => {
  let createCurrencyUseCase: CreateCurrecyUseCase;
  const currecyRepositoryMock = new CurrencyRepositoryMock();
  beforeEach(async () => {
    createCurrencyUseCase = new CreateCurrecyUseCase(
      currecyRepositoryMock,
      new LoggerClientMock(),
    );
  });

  it('When call to create Currency Then return currency created', async () => {
    const input = new CreateCurrencyDto();
    const quote = new QuotesDto();
    quote.alias = 'BRL';
    quote.price = 1;
    input.quotes = [];
    input.quotes.push(quote);
    input.alias = 'BRL';
    input.name = 'Real';

    jest.spyOn(currecyRepositoryMock, 'create').mockResolvedValue(input as any);

    const result = await createCurrencyUseCase.exec(input, {});
    expect(result).toBe(input);
  });

  it('When call to create duplicated Currency should return currency Error', async () => {
    const input = new CreateCurrencyDto();
    const quote = new QuotesDto();
    quote.alias = 'BRL';
    quote.price = 1;
    input.quotes = [];
    input.quotes.push(quote);
    input.alias = 'BRL';
    input.name = 'Real';

    jest
      .spyOn(currecyRepositoryMock, 'findByAlias')
      .mockResolvedValue(input as any);

    expect(createCurrencyUseCase.exec(input, {})).rejects.toThrowError(
      new BadRequestException('Currency already exists'),
    );
  });
});
