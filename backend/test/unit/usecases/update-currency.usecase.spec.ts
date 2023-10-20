import { UpdateCurrecyUseCase } from '../../../src/usecases/update-currecy.usecase';
import { CreateCurrencyDto } from '../../../src/infra/controller/currency/dto/create-currency.dto';
import { QuotesDto } from '../../../src/infra/controller/currency/dto/quotes.dto';
import { CurrencyRepository } from '../../../src/infra/repository/currency.repository';

const findByAlias = jest.fn().mockReturnValue({
  _id: '652839e44370f34a593cc2f8',
  name: 'Real Brasileiro',
  alias: 'BRL',
  quotes: [
    {
      alias: 'USD',
      name: 'Dólar Comercial',
      price: 5.0557,
    },
  ],
});

jest.mock('../../../src/infra/repository/currency.repository', () => {
  return {
    CurrencyRepository: jest.fn().mockImplementation(() => {
      return {
        findByAlias,
        update: jest.fn().mockReturnValue({}),
      };
    }),
  };
});

const modelMock = {};

describe('Given UpdateCurrecyUseCase', () => {
  let updateCurrecyUseCase: UpdateCurrecyUseCase;
  let currencyRepositoryMock: CurrencyRepository;

  beforeEach(async () => {
    currencyRepositoryMock = new CurrencyRepository(modelMock as any);
    updateCurrecyUseCase = new UpdateCurrecyUseCase(
      currencyRepositoryMock as any,
    );
  });

  it('When call to get currency by alias Then return a currency', async () => {
    const input = new CreateCurrencyDto();
    const quote = new QuotesDto();
    quote.alias = 'BRL';
    quote.price = 1;
    input.quotes = [];
    input.quotes.push(quote);
    input.alias = 'BRL';
    input.name = 'Real';
    await updateCurrecyUseCase.exec('BRL', input);
    expect(currencyRepositoryMock.update).toBeCalledWith('BRL', input);
  });

  it('When call to get no founded currency by alias Then return Error', async () => {
    const input = new CreateCurrencyDto();
    const quote = new QuotesDto();
    quote.alias = 'BRL';
    quote.price = 1;
    input.quotes = [];
    input.quotes.push(quote);
    input.alias = 'BRL';
    input.name = 'Real';
    findByAlias.mockResolvedValue(null);
    expect(updateCurrecyUseCase.exec('BRL', input)).rejects.toThrow(
      new Error('Currency not found'),
    );
  });
});
