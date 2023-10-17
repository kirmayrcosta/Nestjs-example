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

  it("When call to update quote to currency Should return success", () => {
      expect(true).toBe(false)
  });

  it("When call to update quote to noexistent currency Should return no content", () => {
    expect(true).toBe(false)
  });

  it("When call to update quote with invalid fields to currency Should return business error", () => {
    expect(true).toBe(false)
  });

  it("When call to update quote currency Should return internal server error", () => {
    expect(true).toBe(false)
  });
});