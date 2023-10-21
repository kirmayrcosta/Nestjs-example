
import {CacheInterceptor} from '../../../../src/infra/interceptor/cache.interceptor';


jest.mock(
  '../../../../src/infra/protocols/logger/logger-client.protocols',
  () => {
    return {
      LoggerClientProtocols: jest.fn().mockImplementation(() => {
        return {
          setCtx: jest.fn().mockReturnValue({}),
          log: jest.fn(),
        };
      }),
    };
  },
);

import { LoggerClientProtocols } from '../../../../src/infra/protocols/logger/logger-client.protocols';
import {ConfigService} from "@nestjs/config";
import {EnvConfigService} from "../../../../src/infra/config/env-config.service";

const executionContext = {
  switchToHttp: jest.fn().mockReturnValue({
    getRequest: jest.fn().mockReturnValue({
      path: '/v1/currency',
      method: 'GET',
      route: {
        path: '/v1/currency',
      },
      headers: {
        'x-request-id': '123',
        'x-correlation-id': '123',
      },
    }),
    getResponse: jest.fn().mockReturnValue({
      status: jest.fn().mockReturnValue({
        json: jest.fn().mockReturnValue({}),
      }),
    }),
  }),
};

const callHandler = {
  handle: jest.fn().mockReturnValue({
    pipe: jest.fn().mockReturnValue({}),
  }),
};

const cache = {
    get: jest.fn().mockReturnValue(null),
    set: jest.fn().mockReturnValue({})
}

describe('Given CacheInterceptor', () => {
  let cacheInterceptor: CacheInterceptor;
  const configService = new ConfigService();
  let envConfig: EnvConfigService;

  beforeEach(async () => {
    envConfig = new EnvConfigService(configService);
    cacheInterceptor = new CacheInterceptor(
      new LoggerClientProtocols(envConfig),
      cache as any

    );
  });
  it('When call interceptor CacheInterceptor Should return success', async () => {
    cacheInterceptor.intercept(executionContext as any, callHandler as any);
    expect(executionContext.switchToHttp).toBeCalled();
    expect(executionContext.switchToHttp().getRequest).toBeCalled();
  });

  it('When call interceptor LoggingInterceptor without correlationId Should return success', async () => {
    cache.get = jest.fn().mockReturnValue({result : 1});
    cacheInterceptor.intercept(executionContext as any, callHandler as any);
    expect(executionContext.switchToHttp).toBeCalled();
    expect(executionContext.switchToHttp().getRequest).toBeCalled();
  });
});
