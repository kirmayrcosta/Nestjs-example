import { QuotesDto } from '../../../src/infra/controller/currency/dto/quotes.dto';
import { AddQuoteToCurrencyUseCase } from '../../../src/usecases/add-quote-to-currency.usecase';
import {CurrencyRepositoryMock} from "../mock/currencyRepository.mock";



describe.skip('AddQuoteToCurrencyUseCase', () => {
  let addQuoteToCurrencyUseCase: AddQuoteToCurrencyUseCase;
  beforeEach(async () => {
    addQuoteToCurrencyUseCase = new AddQuoteToCurrencyUseCase(
      new CurrencyRepositoryMock(),
    );
  });

  it('should be defined', async () => {
    const input = new QuotesDto();
    input.alias = 'USD';
    input.price = 1;

    const result = await addQuoteToCurrencyUseCase.exec('ABC', input);
    expect(result).toBe('sucesso');
  });
});