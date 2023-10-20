import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {AppModuleMock} from "./mock/app.module.mock";
import ValidationPipeCommons from "../../src/infra/commons/validation-pipe.commons";

describe('DELETE /v1/currency/:alias/quotes', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModuleMock],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(ValidationPipeCommons());
    await app.init();
  });

  it('When call to remove quote to currency Should return success', async () => {
    await request(app.getHttpServer()).post('/v1/currency')
        .set('Accept', 'application/json')
        .send({
          name: 'Brazilian Real',
          alias: 'BRL',
          quotes: [{
            name: 'United States Dollar',
            alias: 'USD',
            price: 5
          },{
            name: 'Euro',
            alias: 'EUR',
            price: 6
          }],
        });

    await request(app.getHttpServer()).del('/v1/currency/BRL/quotes/EUR')
        .set('Accept', 'application/json')


    const response = await request(app.getHttpServer()).get('/v1/currency/BRL')
        .set('Accept', 'application/json')
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      "alias": "BRL",

      "name": "Brazilian Real",
      "quotes": [
        {
          "name": "United States Dollar",
          "alias": "USD",
          "price": 5
        }
      ]
    })
  });

  it('When call to remove quote to noexistent currency Should return Bad Request', async () => {
    const response = await request(app.getHttpServer()).del('/v1/currency/BRL/quotes/USD')
        .set('Accept', 'application/json')
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      "message": "Currency not found",
      "error": "Bad Request",
      "statusCode": 400
    })

  });

  it('When call to remove noexistente quote currency Should return Bad Request', async () => {

    await request(app.getHttpServer()).post('/v1/currency')
        .set('Accept', 'application/json')
        .send({
          name: 'Brazilian Real',
          alias: 'BRL',
          quotes: [{
            name: 'United States Dollar',
            alias: 'USD',
            price: 5
          }],
        });
    const response = await request(app.getHttpServer()).del('/v1/currency/BRL/quotes/EUR')
        .set('Accept', 'application/json')
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      "message": "Quote not found",
      "error": "Bad Request",
      "statusCode": 400
    })

  });
});
