import { GetAllCurrencyUseCase } from '../../../src/usecases/get-all-currency.usecase';

describe('Given GetAllCurrencyUseCase', () => {
  let getAllCurrencyUseCase: GetAllCurrencyUseCase;

  const currencyRepositoryMock = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    getAllCurrencyUseCase = new GetAllCurrencyUseCase(
      currencyRepositoryMock as any,
    );
  });

  it('When call to get all Currencies Then return a list of currencies', async () => {
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
            price: 1,
          },
        ],
      },
    ];
    currencyRepositoryMock.findAll.mockResolvedValue(mock as any);
    const result = await getAllCurrencyUseCase.exec();
    expect(result).toBe(mock);
  });
});
