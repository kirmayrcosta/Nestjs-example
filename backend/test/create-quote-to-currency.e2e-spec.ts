import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('POST /v1/currency/:alias/quotes', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("When call to add quote to currency Should return success with status code created", () => {
      expect(true).toBe(false)
  });

  it("When call to add quote to noexistent currency Should return no content", () => {
    expect(true).toBe(false)
  });

  it("When call to add quote with invalid fields to currency Should return business error", () => {
    expect(true).toBe(false)
  });

  it("When call to add quote currency Should return internal server error", () => {
    expect(true).toBe(false)
  });
});
