import { QuotesDto } from '../../../src/infra/controller/currency/dto/quotes.dto';
import { AddQuoteToCurrencyUseCase } from '../../../src/usecases/add-quote-to-currency.usecase';
import { CurrencyRepository } from '../../../src/infra/repository/currency.repository';
import { BadRequestException } from '@nestjs/common';

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
        addQuote: jest.fn().mockReturnValue({}),
      };
    }),
  };
});

const modelMock = {};

describe('Given AddQuoteToCurrencyUseCase', () => {
  let addQuoteToCurrencyUseCase: AddQuoteToCurrencyUseCase;
  let currencyRepositoryMock: CurrencyRepository;
  beforeEach(async () => {
    currencyRepositoryMock = new CurrencyRepository(modelMock as any);
    addQuoteToCurrencyUseCase = new AddQuoteToCurrencyUseCase(
      currencyRepositoryMock,
    );
  });

  it('When call to add quote to currency Should return currency', async () => {
    const input = new QuotesDto();
    input.alias = 'EUA';
    input.name = 'Dólar Comercial';
    input.price = 1;

    await addQuoteToCurrencyUseCase.exec('ABC', input);

    expect(currencyRepositoryMock.findByAlias).toBeCalled();
    expect(currencyRepositoryMock.addQuote).toBeCalledWith('ABC', {
      alias: 'EUA',
      name: 'Dólar Comercial',
      price: 1,
    });
  });

  it('When call to add quote to noexistence currency Should return Error', async () => {
    const input = new QuotesDto();
    input.alias = 'EUA';
    input.name = 'Dólar Comercial';
    input.price = 1;

    findByAlias.mockResolvedValue(null);
    expect(addQuoteToCurrencyUseCase.exec('ABC', input)).rejects.toThrow(
      new BadRequestException('Currency not found'),
    );
  });

  it('When call to add existence quote currency Should return Error', async () => {
    const input = new QuotesDto();
    input.alias = 'USD';
    input.name = 'Dólar Comercial';
    input.price = 1;

    findByAlias.mockResolvedValue({
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
    expect(addQuoteToCurrencyUseCase.exec('ABC', input)).rejects.toThrow(
      new BadRequestException('Quote already exists'),
    );
  });
});
