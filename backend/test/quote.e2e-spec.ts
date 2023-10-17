import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Currency } from '../src/domain/entities/currency.entity';

describe.skip('Currency (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/currency (GET)', () => {
    return request(app.getHttpServer())
      .get('/currency')
      .expect(200)
      .expect('This action returns all currency');
  });

  it('/currency (POST)', () => {
    const currency = {
      name: 'test',
      alias: 'BRL',
      quotes: [
        {
          alias: 'USD',
          price: 5.0557,
        },
      ],
    };
    return request(app.getHttpServer())
      .post('/currency')
      .send(currency)
      .expect(200)
      .expect('This action returns all currency');
  });
});
