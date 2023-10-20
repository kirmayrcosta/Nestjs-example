import { ConfigService } from '@nestjs/config';

const logger = {
  debug: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};

jest.mock('winston', () => ({
  createLogger: jest.fn().mockReturnValue(logger),
  transports: {
    Console: jest.fn(),
  },
  format: {
    json: jest.fn(),
  },
}));
jest.mock('winston-loki', () =>
  jest.fn().mockReturnValue({
    LokiTransport: jest.fn(),
  }),
);

import { LoggerClientProtocols } from '../../../../src/infra/protocols/logger/logger-client.protocols';
import { EnvConfigService } from '../../../../src/infra/config/env-config.service';

describe('Given LoggerClientProtocol', () => {
  let loggerClientProtocols: LoggerClientProtocols;
  const configService = new ConfigService();
  let envConfig: EnvConfigService;

  beforeEach(async () => {
    process.env.NODE_ENV = 'TEST';
    envConfig = new EnvConfigService(configService);
    loggerClientProtocols = new LoggerClientProtocols(envConfig);
  });
  describe('Given setContext', () => {
    process.env.NODE_ENV = 'PRODUCTION';
    envConfig = new EnvConfigService(configService);
    loggerClientProtocols = new LoggerClientProtocols(envConfig);
    it('When call to setContext Should return context', async () => {
      const ctx = {
        requestId: '123',
        correlationId: '123',
        path: '/v1/currency',
        method: 'GET',
      };
      const result = loggerClientProtocols.setCtx(ctx);
      expect(result).toEqual(ctx);
    });
  });
  describe('Given Debug', () => {
    it('When call to debug Should return success', async () => {
      const ctx = {
        requestId: '123',
        correlationId: '123',
        path: '/v1/currency',
        method: 'GET',
      };
      loggerClientProtocols.debug('controller', 'message', ctx);
      expect(logger.debug).toBeCalledWith('[DEBUG] [controller] message', ctx);
    });
  });

  describe('Given Log', () => {
    it('When call to log Should return success', async () => {
      const data = {
        requestId: '123',
        correlationId: '123',
        path: '/v1/currency',
        method: 'GET',
      };
      loggerClientProtocols.setCtx(data);
      loggerClientProtocols.log('message', 'controller', data);
      expect(logger.info).toBeCalledWith('[INFO] [controller] message', data);
    });
  });

  describe('Given Error', () => {
    it('When call to error Should return success', async () => {
      loggerClientProtocols.error('controller', 'message');
      expect(logger.error).toBeCalledWith(
        '[ERROR] [controller] message',
        undefined,
      );
    });
  });

  describe('Given Warn', () => {
    it('When call to error Should return success', async () => {
      loggerClientProtocols.warn('controller', 'message');
      expect(logger.warn).toBeCalledWith('[WARN] [controller] message');
    });
  });

  describe('Given Verbose', () => {
    it('When call to error Should return success', async () => {
      loggerClientProtocols.verbose('controller', 'message');
      expect(logger.warn).toBeCalledWith('[VERBOSE] [controller] message');
    });
  });
});
