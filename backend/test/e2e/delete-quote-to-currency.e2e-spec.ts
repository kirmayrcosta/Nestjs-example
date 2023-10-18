import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('DELETE /v1/currency/:alias/quotes', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('When call to remove quote to currency Should return success with status code no content', () => {
    expect(true).toBe(false);
  });

  it('When call to remove quote to noexistent currency Should return no content', () => {
    expect(true).toBe(false);
  });

  it('When call to remove quote currency Should return internal server error', () => {
    expect(true).toBe(false);
  });
});
