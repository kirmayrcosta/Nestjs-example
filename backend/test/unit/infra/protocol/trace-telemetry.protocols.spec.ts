import { TraceTelemetryProtocol } from '../../../../src/infra/protocols/trace/trace-telemetry.protocol';
import { ConfigService } from '@nestjs/config';
import { EnvConfigService } from '../../../../src/infra/config/env-config.service';

jest.mock('@opentelemetry/auto-instrumentations-node', () => {
  return {
    getNodeAutoInstrumentations: jest.fn().mockImplementation(() => {
      return {};
    }),
  };
});

jest.mock('@opentelemetry/exporter-trace-otlp-grpc', () => {
  return {
    OTLPTraceExporter: jest.fn().mockImplementation(() => {
      return {};
    }),
  };
});

jest.mock('@opentelemetry/sdk-node', () => {
  return {
    NodeSDK: jest.fn().mockImplementation(() => {
      return {
        start: jest.fn().mockImplementation(() => {}),
        shutdown: jest.fn().mockImplementation(() => {}),
      };
    }),
  };
});

jest.mock('@opentelemetry/resources', () => {
  return {
    Resource: jest.fn().mockImplementation(() => {
      return {};
    }),
  };
});

describe('Given TraceTelemetryProtocol', () => {
  let traceTelemetryProtocol: TraceTelemetryProtocol;
  const configService = new ConfigService();
  let envConfig: EnvConfigService;
  beforeEach(async () => {
    envConfig = new EnvConfigService(configService);
    traceTelemetryProtocol = new TraceTelemetryProtocol(envConfig);
  });
  it('When called to start trace Then return success', async () => {
    traceTelemetryProtocol.start();
    expect(traceTelemetryProtocol).toBeDefined();
    expect(traceTelemetryProtocol.shutdown).toBeDefined();
    expect(traceTelemetryProtocol.start).toBeDefined();
  });

  it('When called to shutdown the trace Then return success', async () => {
    traceTelemetryProtocol.start();
    traceTelemetryProtocol.shutdown();
    expect(traceTelemetryProtocol).toBeDefined();
    expect(traceTelemetryProtocol.shutdown).toBeDefined();
    expect(traceTelemetryProtocol.start).toBeDefined();
  });
});
