import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('DELETE /v1/currency/:alias', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('When call to delete currency by alias Should return success with no content', () => {
    expect(true).toBe(false);
  });

  it('When call to delete noexistent currency by alias Should return no content', () => {
    expect(true).toBe(false);
  });

  it('When call to delete noexistent currency by alias return internal server error', () => {
    expect(true).toBe(false);
  });
});
