import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe.skip('GET /v1/currency/:alias', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('When call to get currency by alias Should return the currency', () => {
    expect(true).toBe(false);
  });

  it('When call to get nonexistent currency Should return no content ', () => {
    expect(true).toBe(false);
  });

  it('When call to get currency by alias Should return internal server error', () => {
    expect(true).toBe(false);
  });
});
