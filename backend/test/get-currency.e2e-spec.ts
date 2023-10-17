import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('GET /v1/currency', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('When call to create a new currency Should return currency created ', () => {
    expect(true).toBe(false);
  });

  it('When call to create the same currency created Should return business error', () => {
    expect(true).toBe(false);
  });

  it('When call to create currency with invalid data Should return validation error', () => {
    expect(true).toBe(false);
  });

  it('When call to create currency with invalid data Should return internal server error', () => {
    expect(true).toBe(false);
  });
});
