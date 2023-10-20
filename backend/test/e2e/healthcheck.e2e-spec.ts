import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {AppModuleMock} from "./mock/app.module.mock";
import ValidationPipeCommons from "../../src/infra/commons/validation-pipe.commons";

describe('Given HealthCheck', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModuleMock],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(ValidationPipeCommons());
    await app.init();
  });

  it('Should return success when call request to heath-check', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('API is running!');
  });
});
