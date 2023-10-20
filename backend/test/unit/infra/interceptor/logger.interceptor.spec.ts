import { LoggingInterceptor } from '../../../../src/infra/interceptor/logger.interceptor';

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

jest.mock(
  '../../../../src/infra/protocols/telemetry/metric-telemetry.protocol',
  () => {
    return {
      MetricTelemetryProtocol: jest.fn().mockImplementation(() => {
        return {
          start: jest.fn().mockReturnValue({}),
          histogramRecord: jest.fn().mockReturnValue({}),
        };
      }),
    };
  },
);
import { LoggerClientProtocols } from '../../../../src/infra/protocols/logger/logger-client.protocols';
import { MetricTelemetryProtocol } from '../../../../src/infra/protocols/telemetry/metric-telemetry.protocol';
import { ConfigService } from '@nestjs/config';
import { EnvConfigService } from '../../../../src/infra/config/env-config.service';

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

describe('Given LoggingInterceptor', () => {
  let loggingInterceptor: LoggingInterceptor;
  const configService = new ConfigService();
  let envConfig: EnvConfigService;

  beforeEach(async () => {
    envConfig = new EnvConfigService(configService);
    loggingInterceptor = new LoggingInterceptor(
      new LoggerClientProtocols(envConfig),
      new MetricTelemetryProtocol(envConfig),
    );
  });
  it('When call interceptor LoggingInterceptor Should return success', async () => {
    loggingInterceptor.intercept(executionContext as any, callHandler as any);
    expect(executionContext.switchToHttp).toBeCalled();
    expect(executionContext.switchToHttp().getRequest).toBeCalled();
    expect(callHandler.handle).toBeCalled();
  });

  it('When call interceptor LoggingInterceptor without correlationId Should return success', async () => {
    executionContext.switchToHttp().getRequest = jest.fn().mockReturnValue({
      path: '/v1/currency',
      method: 'GET',
      route: {
        path: '/v1/currency',
      },
      headers: {
        'x-request-id': '123',
      },
    });
    loggingInterceptor.intercept(executionContext as any, callHandler as any);
    expect(executionContext.switchToHttp).toBeCalled();
    expect(executionContext.switchToHttp().getRequest).toBeCalled();
    expect(callHandler.handle).toBeCalled();
  });
});
