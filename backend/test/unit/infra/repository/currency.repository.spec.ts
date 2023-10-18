import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {CurrencyRepository} from '../../../../src/infra/repository/currency.repository';
import {CurrencyModel} from '../../../../src/infra/schema/currency.schema';
import {Currency} from '../../../../src/domain/entities/currency.entity';
import {Quote} from '../../../../src/domain/entities/quote.entity';

describe('Given CurrencyRepository', () => {
    let currencyRepository: CurrencyRepository;
    let model: Model<CurrencyModel>;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CurrencyRepository,
                {
                    provide: getModelToken('Currency'),
                    useValue: {
                        new: jest.fn().mockResolvedValue(undefined),
                        constructor: jest.fn(),
                        find: jest.fn(),
                        updateOne: jest.fn(),
                        findOneAndUpdate: jest.fn(),
                        findOneAndDelete: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        exec: jest.fn(),
                    },
                },
            ],
            exports: [CurrencyRepository],
        }).compile();

        currencyRepository = module.get<CurrencyRepository>(CurrencyRepository);
        model = module.get<Model<CurrencyModel>>(getModelToken('Currency'));
    });

    describe('Given create', () => {
        it('should to create a currency', async () => {
            const currency: Currency = new Currency({
                alias: 'USD',
                quotes: [
                    new Quote({
                        alias: 'BRL',
                        price: 5.0,
                    }),
                ],
            });

            jest.spyOn(model, 'create').mockResolvedValue(currency as any);
            const teste = await currencyRepository.create(currency);
            expect(teste).toEqual(currency);
        });
    });

    describe('Given findAll', () => {
        it('should to list the currencies', async () => {

            const mock = [
                {
                    "_id": "6528396323ce3ba59e72f1be",
                    "name": "test",
                    "alias": "BRL",
                    "quotes": [{"id": null, "alias": "USD", "price": 5.0557}],
                    "__v": 0
                },
                {
                    "_id": "652839e44370f34a593cc2f8",
                    "name": "test",
                    "alias": "BRL",
                    "quotes": [{"id": null, "alias": "USD", "price": 5.0557}],
                    "__v": 0
                }
            ]

            const result = [{
                "alias": "BRL",
                "name": "",
                "quotes": [{"alias": "USD", "price": 5.0557}]
            }, {"alias": "BRL", "name": "", "quotes": [{"alias": "USD", "price": 5.0557}]}]

            jest.spyOn(model, 'find').mockResolvedValue(mock as any);
            const currencyList = await currencyRepository.findAll();
            expect(currencyList).toEqual(result);
        });
    });

    describe('Given findByAlias', () => {
        it('When currency not exist Should to get the currency with success', async () => {

            const mock = {
                "_id": "6528396323ce3ba59e72f1be",
                "name": "test",
                "alias": "BRL",
                "quotes": [{"id": null, "alias": "USD", "price": 5.0557}],
                "__v": 0
            }

            const result = {
                "alias": "BRL",
                "name": "test",
                "quotes": [
                    {
                        "alias": "USD",
                        "price": 5.0557
                    }
                ]
            }

            jest.spyOn(model, 'findOne').mockResolvedValue(mock as any);
            const currency = await currencyRepository.findByAlias("BRL");
            expect(currency).toEqual(result);
        });

        it('When currency not exist should to return empty', async () => {

            const mock = null
            jest.spyOn(model, 'findOne').mockResolvedValue(mock as any);
            const currency = await currencyRepository.findByAlias("BRL");
            expect(currency).toEqual(undefined);
        });
    });


    describe('Given update', () => {
        it('When currency exist Should to return success', async () => {

            const currencyMock: Currency = new Currency({
                alias: 'USD',
                quotes: [
                    new Quote({
                        alias: 'BRL',
                        price: 5.0,
                    }),
                ],
            });

            await currencyRepository.update("BRL", currencyMock);
            expect(model.findOneAndUpdate).toBeCalledWith({"alias": "BRL"}, currencyMock);
        });
    });

    describe('Given delete', () => {
        it('When delete currency Should to return success', async () => {

            await currencyRepository.delete("BRL");
            expect(model.findOneAndDelete).toBeCalledWith({"alias": "BRL"});
        });
    });

    describe('Given addQuote', () => {
        it('When add quote to currency Should to return success', async () => {

            const quote = new Quote({
                alias: 'BRL',
                price: 5.0,
            });


            await currencyRepository.addQuote("BRL", quote);
            expect(model.updateOne).toBeCalledWith({alias: "BRL"}, {$push: {quotes: quote}});
        });
    });

    describe('Given removeQuote', () => {
        it('When remove quote to currency Should to return success', async () => {

            await currencyRepository.removeQuote("BRL", "USD");
            expect(model.updateOne).toBeCalledWith({alias: "BRL"}, {$pull: {quotes: {alias: "USD"}}});
        });
    });

    describe('Given updateQuote', () => {
        it('When update quote to currency Should to return success', async () => {

            const quote = new Quote({
                alias: 'BRL',
                price: 5.0,
            });


            await currencyRepository.updateQuote("BRL", "USD", quote);
            expect(model.updateOne).toBeCalledWith({
                alias: "BRL",
                "quotes.alias": "USD"
            }, {$set: {"quotes.$.price": quote.price}});
        });
    });
});
