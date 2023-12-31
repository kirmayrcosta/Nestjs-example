import { MetricTelemetryProtocol } from '../../../../src/infra/protocols/metric/metric-telemetry.protocol';

jest.mock('@opentelemetry/sdk-metrics', () => {
  return {
    MeterProvider: jest.fn().mockImplementation(() => {
      return {
        addMetricReader: jest.fn().mockReturnValue({}),
        start: jest.fn().mockReturnValue({}),
        getMeter: jest.fn().mockReturnValue({
          createHistogram: jest.fn().mockReturnValue({
            record: jest.fn().mockReturnValue({}),
          }),
        }),
      };
    }),
    PeriodicExportingMetricReader: jest.fn().mockImplementation(() => {}),
  };
});
import { EnvConfigService } from '../../../../src/infra/config/env-config.service';
import { ConfigService } from '@nestjs/config';
jest.mock('@opentelemetry/api', () => {
  return {
    metrics: {
      setGlobalMeterProvider: jest.fn(),
      getMeter: jest.fn().mockReturnValue({
        createHistogram: jest.fn().mockReturnValue({
          record: jest.fn().mockReturnValue({}),
        }),
      }),
    },
  };
});

jest.mock('@opentelemetry/exporter-metrics-otlp-grpc', () => {
  return {
    OTLPMetricExporter: jest.fn().mockImplementation(() => {
      return {
        export: jest.fn().mockReturnValue({}),
        shutdown: jest.fn().mockReturnValue({}),
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

describe('Given MetricTelemetryProtocol', () => {
  let metricTelemetryProtocol: MetricTelemetryProtocol;
  const configService = new ConfigService();
  let envConfig: EnvConfigService;
  beforeEach(async () => {
    envConfig = new EnvConfigService(configService);
    metricTelemetryProtocol = new MetricTelemetryProtocol(envConfig);
  });
  describe('When called to set metric Then return success', () => {
    process.env.NODE_ENV = 'PRODUCTION';
    it('When call to setContext Should return context', async () => {
      metricTelemetryProtocol.start();
      metricTelemetryProtocol.histogramRecord(100, {
        method: 'GET',
        path: '/v1/currency',
      });
    });
  });
});
