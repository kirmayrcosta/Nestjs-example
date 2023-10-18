import {UpdateCurrecyUseCase} from "../../../src/usecases/update-currecy.usecase";
import {CreateCurrencyDto} from "../../../src/infra/controller/currency/dto/create-currency.dto";
import {QuotesDto} from "../../../src/infra/controller/currency/dto/quotes.dto";


describe('Given UpdateCurrecyUseCase', () => {
  let updateCurrecyUseCase: UpdateCurrecyUseCase;

  const currencyRepositoryMock = {
    update: jest.fn(),
  }

  beforeEach(async () => {
    updateCurrecyUseCase = new UpdateCurrecyUseCase(
        currencyRepositoryMock as any,
    );
  });

  it('When call to get currency by alias Then return a currency', async () => {

    let input = new CreateCurrencyDto();
    let quote = new QuotesDto();
    quote.alias = 'BRL';
    quote.price = 1;
    input.quotes = [];
    input.quotes.push(quote);
    input.alias = 'BRL';
    input.name = 'Real';
    await updateCurrecyUseCase.exec("BRL", input);
    expect(currencyRepositoryMock.update).toBeCalledWith("BRL", input);
  });
});
