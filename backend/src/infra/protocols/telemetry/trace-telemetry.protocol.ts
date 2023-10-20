import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { Resource } from '@opentelemetry/resources';
import * as opentelemetry from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

export class TraceTelemetryProtocol {
  private sdk: any;

  constructor() {
    const traceExporter = new OTLPTraceExporter({
      url: 'http://localhost:4317',
    });
    this.sdk = new opentelemetry.NodeSDK({
      traceExporter,
      instrumentations: [
        getNodeAutoInstrumentations({
          '@opentelemetry/instrumentation-fs': {
            enabled: false,
          },
        }),
      ],
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'currency-api',
      }),
    });
  }

  start() {
    this.sdk.start();
  }

  shutdown() {
    return this.sdk.shutdown();
  }
}
