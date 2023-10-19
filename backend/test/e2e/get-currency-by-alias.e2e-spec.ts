import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {AppModuleMock} from "./mock/app.module.mock";
import ValidationPipeCommons from "../../src/infra/commons/validation-pipe.commons";
import * as request from "supertest";

describe('GET /v1/currency/:alias', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModuleMock],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(ValidationPipeCommons());
    await app.init();
  });

  it('When call to get currency by alias Should return the currency', async () => {
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

    const response = await request(app.getHttpServer()).get('/v1/currency/BRL')
        .set('Accept', 'application/json')
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
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
    })
  });

  it('When call to get nonexistent currency Should return no content ', async () => {
    const response = await request(app.getHttpServer()).get('/v1/currency/BRL')
        .set('Accept', 'application/json')
    expect(response.status).toBe(200);
    expect(response.body).toEqual({})
    })

});
