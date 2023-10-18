import {QuotesDto} from '../../../src/infra/controller/currency/dto/quotes.dto';
import {AddQuoteToCurrencyUseCase} from '../../../src/usecases/add-quote-to-currency.usecase';
import {CurrencyRepositoryMock} from "../mock/currencyRepository.mock";
import {CreateCurrecyUseCase} from "../../../src/usecases/create-currecy.usecase";
import {BadRequestException, LoggerService} from "@nestjs/common";
import {ILogger} from "../../../src/domain/protocols/ILogger";
import {LoggerClientMock} from "../mock/loggerClientProtocols.mock";
import {CreateCurrencyDto} from "../../../src/infra/controller/currency/dto/create-currency.dto";
import {ConverterCurrencyToPriceUseCase} from "../../../src/usecases/converter-currency-to-price.usecase";
import {GetAllCurrencyUseCase} from "../../../src/usecases/get-all-currency.usecase";
import {GetCurrencyUseCase} from "../../../src/usecases/get-currency.usecase";
import {RemoveQuoteToCurrencyUsecase} from "../../../src/usecases/remove-quote-to-currency.usecase";


describe('Given getCurrencyUseCase', () => {
    let removeQuoteToCurrencyUsecase: RemoveQuoteToCurrencyUsecase;

    const currencyRepositoryMock = {
        removeQuote: jest.fn(),
    }

    beforeEach(async () => {
        removeQuoteToCurrencyUsecase = new RemoveQuoteToCurrencyUsecase(
            currencyRepositoryMock as any,
        );
    });

    it('When call to get currency by alias Then return a currency', async () => {

        const mock =
            {
                "alias": "ABD",
                "name": "",
                "quotes": [
                    {
                        "alias": "USD",
                        "price": 5.0557
                    },
                    {
                        "alias": "BRL",
                        "price": 1
                    }
                ]
            }

        await removeQuoteToCurrencyUsecase.exec("BRL", "USD");
        expect(currencyRepositoryMock.removeQuote).toBeCalledWith("BRL", "USD");
    });

});
