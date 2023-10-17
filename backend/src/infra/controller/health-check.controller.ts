import { Controller, Get, Inject } from '@nestjs/common';
import { HealthCheckUseCase } from '../../usecases/health-check.usecase';
import { FactoryModule } from '../../factory.module';

@Controller()
export class HealthCheckController {
  constructor(
    @Inject(FactoryModule.HEALTH_CHECK_USE_CASE)
    private readonly healthCheckUseCase: HealthCheckUseCase,
  ) {}

  @Get()
  getHello(): string {
    return this.healthCheckUseCase.exec();
  }
}
