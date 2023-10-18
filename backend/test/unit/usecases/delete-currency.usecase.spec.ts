import {CurrencyRepositoryMock} from "../mock/currencyRepository.mock";
import {DeleteCurrencyUseCase} from "../../../src/usecases/delete-currency.usecase";


describe('Given DeleteCurrencyUseCase', () => {
  let deleteCurrencyUseCase: DeleteCurrencyUseCase;
  let currecyRepositoryMock = new  CurrencyRepositoryMock();
  beforeEach(async () => {
    deleteCurrencyUseCase = new DeleteCurrencyUseCase(
        currecyRepositoryMock
    );
  });

  it('When call to create Currency Then return to remove currency', async () => {

    const alias = 'BRL';
    jest.spyOn(currecyRepositoryMock, 'delete').mockResolvedValue(undefined as any);
    const result = await deleteCurrencyUseCase.exec(alias);
    expect(result).toBe(undefined);
  });
});
