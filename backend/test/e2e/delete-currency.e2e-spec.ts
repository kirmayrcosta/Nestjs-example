import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {AppModuleMock} from "./mock/app.module.mock";
import PipeValidationCommons from "../../src/infra/commons/validation-pipe.commons";

describe('DELETE /v1/currency/:alias', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModuleMock],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(PipeValidationCommons());
    await app.init();
  });

  it('When call to delete currency by alias Should return success with no content', async () => {

    await request(app.getHttpServer()).post('/v1/currency')
        .set('Accept', 'application/json')
        .send({
          name: 'delete',
          alias: 'DEL',
          quotes: [],
        });

    const result = await request(app.getHttpServer()).delete('/v1/currency/DEL')
        .set('Accept', 'application/json')
        .send({
          name: 'delete',
          alias: 'DEL',
          quotes: [],
        });

    expect(result.status).toBe(204);

  });

  it('When call to delete noexistent currency by alias Should return no content', async () => {
    const result = await request(app.getHttpServer()).delete('/v1/currency/DEL')
        .set('Accept', 'application/json')
        .send({
          name: 'delete',
          alias: 'DEL',
          quotes: [],
        });

    expect(result.status).toBe(204);

  });

});
