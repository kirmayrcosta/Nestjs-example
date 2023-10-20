import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModuleMock } from './mock/app.module.mock';
import ValidationPipeCommons from '../../src/infra/commons/validation-pipe.commons';
import {CacheInterceptor} from "../../src/infra/interceptor/cache.interceptor";
import {CacheInterceptorMock} from "./mock/cache.interceptor.mock";

describe('GET /v1/currency/converter/:alias/:price', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModuleMock],
    }).overrideInterceptor(CacheInterceptor).useClass(CacheInterceptorMock).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(ValidationPipeCommons());
    await app.init();
  });

  it('When call to get quote to currency Should return a list of quotes ', async () => {
    await request(app.getHttpServer())
      .post('/v1/currency')
      .set('Accept', 'application/json')
      .send({
        name: 'Brazilian Real',
        alias: 'BRL',
        quotes: [
          {
            name: 'United States Dollar',
            alias: 'USD',
            price: 5,
          },
          {
            name: 'Euro',
            alias: 'EUR',
            price: 6,
          },
        ],
      });

    const response = await request(app.getHttpServer())
      .get('/v1/currency/converter/BRL/2')
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      alias: 'BRL',
      name: 'Brazilian Real',
      quotes: [
        {
          name: 'United States Dollar',
          alias: 'USD',
          price: 10,
        },
        {
          alias: 'EUR',
          name: 'Euro',
          price: 12,
        },
      ],
    });
  });

  it('When call to get quote to noexistent currency Should return a emptylist of quotes', async () => {
    const response = await request(app.getHttpServer())
      .get('/v1/currency/converter/BRL/2')
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });
});
