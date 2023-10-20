import { QuotesDto } from '../../../src/infra/controller/currency/dto/quotes.dto';
import { UpdateQuoteToCurrencyUsecase } from '../../../src/usecases/update-quote-to-currency.usecase';
import { BadRequestException } from '@nestjs/common';
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
        updateQuote: jest.fn().mockReturnValue({}),
      };
    }),
  };
});

const modelMock = {};
describe('Given UpdateQuoteToCurrencyUsecase', () => {
  let updateQuoteToCurrencyUsecase: UpdateQuoteToCurrencyUsecase;
  let currencyRepositoryMock: CurrencyRepository;

  beforeEach(async () => {
    currencyRepositoryMock = new CurrencyRepository(modelMock as any);
    updateQuoteToCurrencyUsecase = new UpdateQuoteToCurrencyUsecase(
      currencyRepositoryMock as any,
    );
  });

  it('When call to update quote to currency by alias Then return success', async () => {
    const quote = new QuotesDto();
    quote.alias = 'USD';
    quote.price = 1;

    await updateQuoteToCurrencyUsecase.exec('BRL', 'USD', quote);
    expect(currencyRepositoryMock.updateQuote).toBeCalledWith(
      'BRL',
      'USD',
      quote,
    );
  });

  it('When call to update quote to non existence currency by alias Should return Error', async () => {
    const quote = new QuotesDto();
    quote.alias = 'USD';
    quote.price = 1;
    findByAlias.mockResolvedValue(null);

    expect(
      updateQuoteToCurrencyUsecase.exec('BRL', 'ACD', quote),
    ).rejects.toThrow(new BadRequestException('Currency not found'));
  });

  it('When call to update quote to non existence currency by alias Then return Error', async () => {
    const quote = new QuotesDto();
    quote.alias = 'ABC';
    quote.name = 'Dólar Comercial';
    quote.price = 1;

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
    expect(
      updateQuoteToCurrencyUsecase.exec('BRL', 'ABD', quote),
    ).rejects.toThrow(new BadRequestException('Quote already exists'));
  });
});
