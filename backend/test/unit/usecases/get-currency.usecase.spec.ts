import { GetCurrencyUseCase } from '../../../src/usecases/get-currency.usecase';

describe('Given getCurrencyUseCase', () => {
  let getCurrencyUseCase: GetCurrencyUseCase;

  const currencyRepositoryMock = {
    findByAlias: jest.fn(),
  };

  beforeEach(async () => {
    getCurrencyUseCase = new GetCurrencyUseCase(currencyRepositoryMock as any);
  });

  it('When call to get currency by alias Then return a currency', async () => {
    const mock = {
      alias: 'ABD',
      name: '',
      quotes: [
        {
          alias: 'USD',
          price: 5.0557,
        },
        {
          alias: 'BRL',
          price: 1,
        },
      ],
    };

    currencyRepositoryMock.findByAlias.mockResolvedValue(mock as any);
    const result = await getCurrencyUseCase.exec('BRL');
    expect(result).toBe(mock);
  });
});
