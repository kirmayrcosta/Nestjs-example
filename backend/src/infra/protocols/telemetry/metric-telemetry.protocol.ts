import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { metrics } from '@opentelemetry/api';
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

export class MetricTelemetryProtocol {
  histogram: any;
  constructor() {
    const otelMetricsInterval = 5000;

    const metricExporter = new OTLPMetricExporter({
      url: 'http://localhost:4317',
    });

    const meterProvider = new MeterProvider({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'currency-api',
      }),
    });

    meterProvider.addMetricReader(
      new PeriodicExportingMetricReader({
        exporter: metricExporter,
        exportIntervalMillis: otelMetricsInterval,
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
