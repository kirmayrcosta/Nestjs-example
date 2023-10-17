import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PUT /v1/currency/:alias', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("When call to update currency by alias Should return the success", () => {
      expect(true).toBe(false)
  });

  it("When call to update nonexistent currency Should return no content ", () => {
    expect(true).toBe(false)
  });

  it("When call to update currency with invalid fields Should return Business Error ", () => {
    expect(true).toBe(false)
  });

  it("When call to update currency by alias Should return internal server error", () => {
    expect(true).toBe(false)
  });
});
