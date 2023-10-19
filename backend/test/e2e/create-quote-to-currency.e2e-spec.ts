import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {AppModuleMock} from "./mock/app.module.mock";
import ValidationPipeCommons from "../../src/infra/commons/validation-pipe.commons";

describe('Given POST /v1/currency/:alias/quotes', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModuleMock],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(ValidationPipeCommons());
    await app.init();
  });

  it('When call to add quote to currency Should return success with status code created', async () => {
    await request(app.getHttpServer()).post('/v1/currency')
        .set('Accept', 'application/json')
        .send({
          name: 'Brazilian Real',
          alias: 'BRL',
          quotes: [],
        });

    await request(app.getHttpServer()).post('/v1/currency/BRL/quotes')
        .set('Accept', 'application/json')
        .send({
          name: 'United States Dollar',
          alias: 'USD',
          price: 5
        });

    const response = await request(app.getHttpServer()).get('/v1/currency/BRL')
        .set('Accept', 'application/json')
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      "alias": "BRL",
      "name": "Brazilian Real",
      "quotes": [
        {
          "alias": "USD",
          "price": 5
        }
      ]
    })
  });

  it('When call to add quote to noexistent currency Should return Bad Request error', async () => {

    const result =await request(app.getHttpServer()).post('/v1/currency/BRL/quotes')
        .set('Accept', 'application/json')
        .send({
          name: 'United States Dollar',
          alias: 'USD',
          price: 5
        });

    expect(result.status).toBe(400);
    expect(result.body).toEqual({
      "message": "Currency not found",
      "error": "Bad Request",
      "statusCode": 400
    })
  });

  it('When call to add quote with invalid fields to currency Should return Bad Request error', async() => {
    await request(app.getHttpServer()).post('/v1/currency')
        .set('Accept', 'application/json')
        .send({
          name: 'Brazilian Real',
          alias: 'BRL',
          quotes: [],
        });

    await request(app.getHttpServer()).post('/v1/currency/BRL/quotes')
        .set('Accept', 'application/json')
        .send({
          name: 'United States Dollar',
          alias: 'USD',
          price: 5
        });

    const result = await request(app.getHttpServer()).post('/v1/currency/BRL/quotes')
        .set('Accept', 'application/json')
        .send({
          name: 'United States Dollar',
          alias: 'USD',
          price: 5
        });

    expect(result.status).toBe(400);
    expect(result.body).toEqual({
      "message": "Quote already exists",
      "error": "Bad Request",
      "statusCode": 400
    })
  });
});
