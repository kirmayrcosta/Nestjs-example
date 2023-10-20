import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerClientProtocols } from './infra/protocols/logger/logger-client.protocols';
import { LoggingInterceptor } from './infra/interceptor/logger.interceptor';
import ValidationPipeCommons from './infra/commons/validation-pipe.commons';
import { AllExceptionFilter } from './infra/filter/all-exception.filter';
import { TraceTelemetryProtocol } from './infra/protocols/telemetry/trace-telemetry.protocol';

async function bootstrap() {
  const trace = new TraceTelemetryProtocol();
  trace.start();
  const [app] = await Promise.all([
    NestFactory.create(AppModule, {
      logger: new LoggerClientProtocols(),
    }),
  ]);

  app.useGlobalFilters(
    new AllExceptionFilter(
      new LoggerClientProtocols(),
      new MetricTelemetryProtocol(),
    ),
  );

  app.useGlobalInterceptors(
    new LoggingInterceptor(
      new LoggerClientProtocols(),
      new MetricTelemetryProtocol(),
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
