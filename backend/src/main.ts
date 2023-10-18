import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerClientProtocols } from './infra/protocols/logger/logger-client.protocols';
import { LoggingInterceptor } from './infra/interceptor/logger.interceptor';

async function bootstrap() {
  const [app] = await Promise.all([
    NestFactory.create(AppModule, {
      logger: new LoggerClientProtocols(),
    }),
  ]);

  app.useGlobalInterceptors(
    new LoggingInterceptor(new LoggerClientProtocols()),
  );
  const config = new DocumentBuilder()
    .setTitle('Currecy Project')
    .setDescription('API to check currency and convert price')
    .setVersion('1.0')
    .addTag('currency')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
