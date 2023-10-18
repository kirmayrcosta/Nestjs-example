import {UpdateCurrecyUseCase} from "../../../src/usecases/update-currecy.usecase";
import {CreateCurrencyDto} from "../../../src/infra/controller/currency/dto/create-currency.dto";
import {QuotesDto} from "../../../src/infra/controller/currency/dto/quotes.dto";
import {UpdateQuoteToCurrencyUsecase} from "../../../src/usecases/update-quote-to-currency.usecase";


describe('Given UpdateQuoteToCurrencyUsecase', () => {
  let updateQuoteToCurrencyUsecase: UpdateQuoteToCurrencyUsecase;

  const currencyRepositoryMock = {
    updateQuote: jest.fn(),
  }

  beforeEach(async () => {
    updateQuoteToCurrencyUsecase = new UpdateQuoteToCurrencyUsecase(
        currencyRepositoryMock as any,
    );
  });

  it('When call to update quote to currency by alias Then return success', async () => {

    let quote = new QuotesDto();
    quote.alias = 'USD';
    quote.price = 1;

    await updateQuoteToCurrencyUsecase.exec("BRL", "USD", quote);
    expect(currencyRepositoryMock.updateQuote).toBeCalledWith("BRL", "USD",quote);
  });
});
