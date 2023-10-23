import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { Resource } from '@opentelemetry/resources';
import * as opentelemetry from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { EnvConfigService } from '../../config/env-config.service';

export class TraceTelemetryProtocol {
  private sdk: any;

  constructor(configService: EnvConfigService) {
    const traceExporter = new OTLPTraceExporter({
      url: configService.getOtelExporterOtlpTracesEndpoint(),
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
        [SemanticResourceAttributes.SERVICE_NAME]:
          configService.getServiceName(),
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
