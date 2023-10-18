import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('POST /v1/currency', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('When call to get currencies Should return a list of currencies', () => {
    expect(true).toBe(false);
  });

  it('When call to get currencies Should return a empty list', () => {
    expect(true).toBe(false);
  });

  it('When call to get currencies Should return internal server error', () => {
    expect(true).toBe(false);
  });
});
