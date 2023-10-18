import { Controller, Get, Inject, Headers } from '@nestjs/common';
import { HealthCheckUseCase } from '../../usecases/health-check.usecase';
import { FactoryModule } from '../../factory.module';
import { LoggerClientProtocols } from '../protocols/logger/logger-client.protocols';

@Controller()
export class HealthCheckController {
  constructor(
    @Inject(FactoryModule.HEALTH_CHECK_USE_CASE)
    private readonly healthCheckUseCase: HealthCheckUseCase,
    private readonly logger: LoggerClientProtocols,
  ) {}

  @Get()
  getHello(
    @Headers('x-request-id') requestId: string,
    @Headers('x-correlation-id') correlationId: string,
  ): string {
    this.logger.setCtx({ requestId, correlationId, path: '/', method: 'GET' });
    return this.healthCheckUseCase.exec();
  }
}
