import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('GET /v1/currency/converter/:alias/:price', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('When call to get quote to currency Should return a list of quotes ', () => {
    expect(true).toBe(false);
  });

  it('When call to get quote to noexistent currency Should return a emptylist of quotes', () => {
    expect(true).toBe(false);
  });

  it('When call to get quote to noexistent currency Should Should return internal server error', () => {
    expect(true).toBe(false);
  });
});
