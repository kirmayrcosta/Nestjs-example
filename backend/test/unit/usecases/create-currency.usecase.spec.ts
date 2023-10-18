import { QuotesDto } from '../../../src/infra/controller/currency/dto/quotes.dto';
import { AddQuoteToCurrencyUseCase } from '../../../src/usecases/add-quote-to-currency.usecase';
import {CurrencyRepositoryMock} from "../mock/currencyRepository.mock";
import {CreateCurrecyUseCase} from "../../../src/usecases/create-currecy.usecase";
import {BadRequestException, LoggerService} from "@nestjs/common";
import {ILogger} from "../../../src/domain/protocols/ILogger";
import {LoggerClientMock} from "../mock/loggerClientProtocols.mock";
import {CreateCurrencyDto} from "../../../src/infra/controller/currency/dto/create-currency.dto";



describe('CreateCurrecyUseCase', () => {
  let createCurrencyUseCase: CreateCurrecyUseCase;
  let currecyRepositoryMock = new  CurrencyRepositoryMock();
  beforeEach(async () => {
    createCurrencyUseCase = new CreateCurrecyUseCase(
        currecyRepositoryMock,
        new LoggerClientMock()
    );
  });

  it('When call to create Currency should return currency created', async () => {

    let input = new CreateCurrencyDto();
    let quote = new QuotesDto();
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

    let input = new CreateCurrencyDto();
    let quote = new QuotesDto();
    quote.alias = 'BRL';
    quote.price = 1;
    input.quotes = [];
    input.quotes.push(quote);
    input.alias = 'BRL';
    input.name = 'Real';


    jest.spyOn(currecyRepositoryMock, 'findByAlias').mockResolvedValue(input as any);

    expect(createCurrencyUseCase.exec(input, {})).rejects.toThrowError(new BadRequestException('Currency already exists'));

  });
});
