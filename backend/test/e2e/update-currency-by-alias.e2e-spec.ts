import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {AppModuleMock} from "./mock/app.module.mock";
import ValidationPipeCommons from "../../src/infra/commons/validation-pipe.commons";

describe('PUT /v1/currency/:alias', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModuleMock],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(ValidationPipeCommons());
    await app.init();
  });

  it('When call to update currency by alias Should return the success', async () => {
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

    await request(app.getHttpServer()).put('/v1/currency/BRL')
        .set('Accept', 'application/json')
        .send({
            name: 'Brazilian Real Mock',
            alias: 'BRB',
            quotes: [{
                name: 'United States Dollar Mock',
                alias: 'USA',
                price: 6
            }],
        });

    const response = await request(app.getHttpServer()).get('/v1/currency/BRB')
        .set('Accept', 'application/json')
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
        name: 'Brazilian Real Mock',
        alias: 'BRB',
        quotes: [{
            name: 'United States Dollar Mock',
            alias: 'USA',
            price: 6
        }],
    })
  });

  it('When call to update nonexistent currency Should return no content ', async () => {
    const response = await request(app.getHttpServer()).put('/v1/currency/BRL')
        .set('Accept', 'application/json')
        .send({
          name: 'United States Dollar',
          alias: 'USD',
          price: 6
        });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      "message":  "Currency not found",
      "error": "Bad Request",
      "statusCode": 400
    })

  });

  it('When call to update currency with invalid fields Should return Business Error ', async () => {
      const result = await request(app.getHttpServer()).post('/v1/currency')
          .set('Accept', 'application/json')
          .send({
              name: 'Brazilian Real',
              alias: 'BRLB',
              quotes: [{
                  name: 'United States Dollar',
                  alias: 'USDD',
              }],
          });

      expect(result.status).toBe(400);
      expect(result.body).toEqual({
          "message": [
              {
                  "property": "alias",
                  "message": "alias must be shorter than or equal to 3 characters"
              }
          ],
          "error": "Bad Request",
          "statusCode": 400
      })
  });

});
