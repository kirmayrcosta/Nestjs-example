import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModuleMock } from './mock/app.module.mock';
import ValidationPipeCommons from '../../src/infra/commons/validation-pipe.commons';

describe('GET /v1/currency', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModuleMock],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(ValidationPipeCommons());
    await app.init();
  });

  it('When call to get all currency Should return a list of currencies', async () => {
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
      .get('/v1/currency')
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        alias: 'BRL',
        name: 'Brazilian Real',
        quotes: [
          {
            alias: 'USD',
            name: 'United States Dollar',
            price: 5,
          },
          {
            alias: 'EUR',
            name: 'Euro',
            price: 6,
          },
        ],
      },
    ]);
  });

  it('When call to get all currency Should return empty list of currencies', async () => {
    const response = await request(app.getHttpServer())
      .get('/v1/currency')
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
