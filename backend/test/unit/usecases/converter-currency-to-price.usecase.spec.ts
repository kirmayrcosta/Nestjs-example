import { QuotesDto } from '../../../src/infra/controller/currency/dto/quotes.dto';
import { ConverterCurrencyToPriceUseCase } from '../../../src/usecases/converter-currency-to-price.usecase';
import { Currency } from '../../../src/domain/entities/currency.entity';
import { Quote } from '../../../src/domain/entities/quote.entity';

describe('Given ConverterCurrencyToPriceUseCase', () => {
  let converterCurrencyToPriceUseCase: ConverterCurrencyToPriceUseCase;

  const currencyRepositoryMock = {
    findByAlias: jest.fn(),
  };

  beforeEach(async () => {
    converterCurrencyToPriceUseCase = new ConverterCurrencyToPriceUseCase(
      currencyRepositoryMock as any,
    );
  });

  it('When call currency to converter price and Should return quotes converted', async () => {
    const input = new QuotesDto();
    input.alias = 'USD';
    input.price = 1;
    const currencyMock: Currency = new Currency({
      alias: 'BRL',
      name: 'test',
      quotes: [
        new Quote({
          alias: 'USD',
          price: 5.0557,
        }),
      ],
    });

    const mock = new Currency({
      alias: 'BRL',
      name: 'test',
      quotes: [
        new Quote({
          alias: 'USD',
          price: 5.0557,
        }),
      ],
    });

    currencyRepositoryMock.findByAlias.mockReturnValue(currencyMock as any);
    const result = await converterCurrencyToPriceUseCase.exec('ABC', 1);
    expect(result).toEqual(mock);
  });

  it('When call currency to converter price and Should return quotes converted', async () => {
    currencyRepositoryMock.findByAlias.mockReturnValue(undefined);
    const result = await converterCurrencyToPriceUseCase.exec('ABC', 1);
    expect(result).toEqual(null);
  });
});
