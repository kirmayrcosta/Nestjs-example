import { ICurrencyRepository } from '../../../domain/repository/ICurrencyRepository';
import { Currency } from '../../../domain/entities/currency.entity';
import { CreateCurrencyDto } from '../../../infra/controller/currency/dto/create-currency.dto';
import { QuotesDto } from '../../../infra/controller/currency/dto/quotes.dto';
import { AddQuoteToCurrencyUseCase } from '../../../usecases/add-quote-to-currency.usecase';
import {CurrencyRepositoryMock} from "../../mock/currencyRepository.mock";



describe('AddQuoteToCurrencyUseCase', () => {
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
