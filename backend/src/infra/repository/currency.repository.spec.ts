import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CurrencyRepository } from './currency.repository';
import {CurrencyModel, CurrencySchema} from '../schema/currency.schema';
import { Currency } from '../../domain/entities/currency.entity';
import { Quote } from '../../domain/entities/quote.entity';


// class MockModel {
//     constructor(private data: Currency) {
//     }
//
//     save(){
//        return jest.fn().mockResolvedValue(this.data);
//     }
//
//     static find = jest.fn().mockResolvedValue([]);
//     static findOne = jest.fn().mockResolvedValue({});
//     static findOneAndUpdate = jest.fn().mockResolvedValue({});
// }

describe('CurrencyRepository', () => {

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
                        create: jest.fn(),
                        exec: jest.fn(),
                    },
                }
            ],
            exports: [CurrencyRepository]
        }).compile();

        currencyRepository = module.get<CurrencyRepository>(CurrencyRepository);
        model = module.get<Model<CurrencyModel>>(getModelToken('Currency'));

    });

    it('should be defined', () => {
        expect(currencyRepository).toBeDefined();
    });

    describe('create', () => {
        it('should create a currency', async () => {
            const currency: Currency = new Currency({
                alias: 'USD',
                quotes: [
                    new Quote({
                        alias: 'BRL',
                        price: 5.0
                    })
                ]
            })

            // const result = await currencyRepository.create(currency);
            //
            // expect(result).toEqual(currency);

            jest.spyOn(model, 'create').mockResolvedValue(currency as any);
            const teste = await currencyRepository.create(currency);
            expect(teste).toEqual(currency);


        });
    });

});