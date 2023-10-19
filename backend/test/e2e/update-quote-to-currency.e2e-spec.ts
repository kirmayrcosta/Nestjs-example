import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {AppModuleMock} from "./mock/app.module.mock";
import ValidationPipeCommons from "../../src/infra/commons/validation-pipe.commons";
import * as request from "supertest";

describe('Given PUT /v1/currency/:alias/quotes', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModuleMock],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(ValidationPipeCommons());
    await app.init();
  });

  it('When call to update quote to currency Should return success', async () => {
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

    await request(app.getHttpServer()).put('/v1/currency/BRL/quotes/USD')
        .set('Accept', 'application/json')
        .send({
          name: 'United States Dollar',
          alias: 'USD',
          price: 6
        });

    const response = await request(app.getHttpServer()).get('/v1/currency/BRL')
        .set('Accept', 'application/json')
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      "alias": "BRL",
      "name": "Brazilian Real",
      "quotes": [
        {
          "name": 'United States Dollar',
          "alias": "USD",
          "price": 6
        },{
          name: 'Euro',
          alias: 'EUR',
          price: 6
        }
      ]
    })
  });

  it('When call to update with invalid quote to currency Should return Bad Request', async () => {
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

      const response =  await request(app.getHttpServer()).put('/v1/currency/BRL/quotes/USD')
        .set('Accept', 'application/json')
        .send({
          name: 'United States Dollar',
          alias: 'USAA',
          price: "1"
        });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
        "message": [
            {
                "property": "alias",
                "message": "alias must be shorter than or equal to 3 characters"
            },
            {
                "property": "price",
                "message": "price must be a number conforming to the specified constraints"
            }
        ],
        "error": "Bad Request",
        "statusCode": 400
    })
  });

  it('When call to update quote to noexistent currency Should return Bad Request', async () => {
    const response = await request(app.getHttpServer()).put('/v1/currency/BRL/quotes/USD')
        .set('Accept', 'application/json')
        .send({
          name: 'United States Dollar',
          alias: 'USD',
          price: 6
        });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      "message": "Currency not found",
      "error": "Bad Request",
      "statusCode": 400
    })
  });

  it('When call to update quote with invalid fields to currency Should return business error', async () => {

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
      const response = await request(app.getHttpServer()).put('/v1/currency/BRL/quotes/EUR')
        .set('Accept', 'application/json')
        .send({
          name: 'United States Dollar',
          alias: 'EUR',
          price: 7
        });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      "message": "Quote not found",
      "error": "Bad Request",
      "statusCode": 400
    })
  });
});
