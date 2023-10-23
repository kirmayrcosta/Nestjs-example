import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { metrics } from '@opentelemetry/api';
import { EnvConfigService } from '../../config/env-config.service';
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

export class MetricTelemetryProtocol {
  histogram: any;
  constructor(configService: EnvConfigService) {
    const metricExporter = new OTLPMetricExporter({
      url: configService.getOtelExporterOtlpMetricEndpoint(),
    });

    const meterProvider = new MeterProvider({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]:
          configService.getServiceName(),
      }),
    });

    meterProvider.addMetricReader(
      new PeriodicExportingMetricReader({
        exporter: metricExporter,
        exportIntervalMillis: configService.getOtelMetricsInterval(),
      }),
    );

    metrics.setGlobalMeterProvider(meterProvider);
  }

  start() {
    const meter = metrics.getMeter('default');
    this.histogram = meter.createHistogram('http.server.responseTime');
  }

  histogramRecord(duration: number, field: any) {
    this.histogram.record(duration, field);
  }
}
