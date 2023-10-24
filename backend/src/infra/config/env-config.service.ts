import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  getOtelExporterOtlpTracesEndpoint() {
    return this.configService.get('OTEL_EXPORTER_OTLP_TRACES_ENDPOINT');
  }

  getServiceName() {
    return this.configService.get('SERVICE_NAME');
  }

  getOtelExporterOtlpMetricEndpoint() {
    return this.configService.get('OTEL_EXPORTER_OTLP_METRICS_ENDPOINT');
  }

  getOtelMetricsInterval() {
    return this.configService.get('OTEL_METRICS_INTERVAL');
  }

  getExporterLogEndpoint() {
    return this.configService.get('EXPORTER_LOG_ENDPOINT');
  }

  getExporterLogBasicAuth() {
    return this.configService.get('EXPORTER_LOG_BASIC_AUTH');
  }
}
