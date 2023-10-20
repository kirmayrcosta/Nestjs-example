import { NestFactory } from '@nestjs/core';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { LoggerClientProtocols } from './infra/protocols/logger/logger-client.protocols';
import { LoggingInterceptor } from './infra/interceptor/logger.interceptor';
import ValidationPipeCommons from './infra/commons/validation-pipe.commons';
import { AllExceptionFilter } from './infra/filter/all-exception.filter';
import { TraceTelemetryProtocol } from './infra/protocols/telemetry/trace-telemetry.protocol';
import { MetricTelemetryProtocol } from './infra/protocols/telemetry/metric-telemetry.protocol';
import { EnvConfigService } from './infra/config/env-config.service';

async function bootstrap() {
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  });
  const configService = new ConfigService();
  const envConfigService = new EnvConfigService(configService);
  const trace = new TraceTelemetryProtocol(envConfigService);

  trace.start();
  const [app] = await Promise.all([
    NestFactory.create(AppModule, {
      logger: new LoggerClientProtocols(envConfigService),
    }),
  ]);

  app.useGlobalFilters(
    new AllExceptionFilter(
      new LoggerClientProtocols(envConfigService),
      new MetricTelemetryProtocol(envConfigService),
    ),
  );

  app.useGlobalInterceptors(
    new LoggingInterceptor(
      new LoggerClientProtocols(envConfigService),
      new MetricTelemetryProtocol(envConfigService),
    ),
  );
  app.useGlobalPipes(ValidationPipeCommons());

  const config = new DocumentBuilder()
    .setTitle('Currecy Project')
    .setDescription('API to check currency and convert price')
    .setVersion('1.0')
    .addTag('currency')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000).catch((error) => {
    console.log(error);
  });

  // gracefully shut down the SDK on process exit
  process.on('SIGTERM', () => {
    trace
      .shutdown()
      .then(() => console.log('Tracing terminated'))
      .catch((error) => console.log('Error terminating tracing', error))
      .finally(() => process.exit(0));
  });
}
bootstrap();
