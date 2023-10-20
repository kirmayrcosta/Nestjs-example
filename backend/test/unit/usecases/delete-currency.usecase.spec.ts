import { DeleteCurrencyUseCase } from '../../../src/usecases/delete-currency.usecase';
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
        delete: jest.fn().mockReturnValue({}),
      };
    }),
  };
});

const modelMock = {};

describe('Given DeleteCurrencyUseCase', () => {
  let deleteCurrencyUseCase: DeleteCurrencyUseCase;
  let currencyRepositoryMock: CurrencyRepository;
  beforeEach(async () => {
    currencyRepositoryMock = new CurrencyRepository(modelMock as any);
    deleteCurrencyUseCase = new DeleteCurrencyUseCase(currencyRepositoryMock);
  });

  it('When call to delte Currency Then return to remove currency', async () => {
    const alias = 'BRL';
    jest
      .spyOn(currencyRepositoryMock, 'delete')
      .mockResolvedValue(undefined as any);
    const result = await deleteCurrencyUseCase.exec(alias);
    expect(result).toBe(undefined);
  });

  it('When call to delete no existence Currency Then return Error', async () => {
    const alias = 'BRL';
    findByAlias.mockResolvedValue(null);
    jest
      .spyOn(currencyRepositoryMock, 'delete')
      .mockResolvedValue(undefined as any);
    expect(deleteCurrencyUseCase.exec(alias)).rejects.toThrowError(
      'Currency not found',
    );
  });
});
