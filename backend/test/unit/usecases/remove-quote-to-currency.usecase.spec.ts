import {RemoveQuoteToCurrencyUsecase} from "../../../src/usecases/remove-quote-to-currency.usecase";
import {CurrencyRepository} from "../../../src/infra/repository/currency.repository";

const findByAlias = jest.fn().mockReturnValue({
    "_id": "652839e44370f34a593cc2f8",
    "name": "Real Brasileiro",
    "alias": "BRL",
    "quotes": [{
        "alias": "USD",
        "name": "Dólar Comercial",
        "price": 5.0557}],

})

const modelMock = {};

jest.mock("../../../src/infra/repository/currency.repository", () => {
    return {
        CurrencyRepository: jest.fn().mockImplementation(() => {
            return {
                findByAlias,
                removeQuote: jest.fn().mockReturnValue({}),
            };
        }),
    };
});

describe('Given RemoveQuoteToCurrencyUsecase', () => {
    let removeQuoteToCurrencyUsecase: RemoveQuoteToCurrencyUsecase;
    let currencyRepositoryMock: CurrencyRepository;


    beforeEach(async () => {
        currencyRepositoryMock = new CurrencyRepository(modelMock as any);

        removeQuoteToCurrencyUsecase = new RemoveQuoteToCurrencyUsecase(
            currencyRepositoryMock as any,
        );
    });

    it('When call to remove currency by alias Then return success', async () => {

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

    it('When call to remove quote to no existence currency by alias Then return Error', async () => {

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
        findByAlias.mockResolvedValue(null);

        expect(removeQuoteToCurrencyUsecase.exec("BRL", "USD")).rejects.toThrow(new Error('Currency not found'));

    });

    it('When call to remove no existence quote to currency by alias Then return Error', async () => {

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
        findByAlias.mockResolvedValue({
            "_id": "652839e44370f34a593cc2f8",
            "name": "Real Brasileiro",
            "alias": "BRL",
            "quotes": [{
                "alias": "USD",
                "name": "Dólar Comercial",
                "price": 5.0557}],

        });

        expect(removeQuoteToCurrencyUsecase.exec("BRL", "ABC")).rejects.toThrow(new Error('Quote not found'));

    });

});
