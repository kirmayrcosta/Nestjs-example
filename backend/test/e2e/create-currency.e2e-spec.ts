import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModuleMock } from './mock/app.module.mock';
import ValidationPipeCommons from '../../src/infra/commons/validation-pipe.commons';
import { closeMongoConnection } from './mock/db-teste-module';
import {CacheInterceptor} from "../../src/infra/interceptor/cache.interceptor";
import {CacheInterceptorMock} from "./mock/cache.interceptor.mock";

describe('Given POST /v1/currency', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModuleMock],
    }).overrideInterceptor(CacheInterceptor).useClass(CacheInterceptorMock).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(ValidationPipeCommons());
    await app.init();
  });

  it('When call to crate currency Should return success', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/currency')
      .set('Accept', 'application/json')
      .send({
        name: 'test',
        alias: 'BRL',
        quotes: [],
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      name: 'test',
      alias: 'BRL',
      quotes: [],
    });
  });

  it('When call to crate invalid currency Should return Validation Error', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/currency')
      .set('Accept', 'application/json')
      .send({
        name: '',
        alias: 'BR',
        quotes: [],
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Bad Request',
      message: [
        {
          message: 'name should not be empty',
          property: 'name',
        },
        {
          message: 'alias must be longer than or equal to 3 characters',
          property: 'alias',
        },
      ],
      statusCode: 400,
    });
  });

  it('When call to crate duplicated currency Should return Business Error', async () => {
    await request(app.getHttpServer())
      .post('/v1/currency')
      .set('Accept', 'application/json')
      .send({
        name: 'test',
        alias: 'BRL',
        quotes: [],
      });

    const duplicateCurrency = await request(app.getHttpServer())
      .post('/v1/currency')
      .set('Accept', 'application/json')
      .send({
        name: 'test',
        alias: 'BRL',
        quotes: [],
      });
    expect(duplicateCurrency.body).toEqual({
      statusCode: 400,
      message: 'Currency already exists',
      error: 'Bad Request',
    });
  });

  afterAll(async () => {
    await closeMongoConnection();
  });
});
