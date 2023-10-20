import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckUseCase } from '../../../../src/usecases/health-check.usecase';
import { DynamicModule } from '@nestjs/common';
import { HealthCheckController } from '../../../../src/infra/controller/health-check.controller';

const HEALTH_CHECK_USE_CASE = 'HealthCheckUseCase';
class UseCaseFactoryModule {
  static register(): DynamicModule {
    return {
      module: UseCaseFactoryModule,
      providers: [
        {
          provide: HEALTH_CHECK_USE_CASE,
          useFactory: () => new HealthCheckUseCase(),
        },
      ],
      exports: [HEALTH_CHECK_USE_CASE],
    };
  }
}

describe('HeathCheck', () => {
  let healthCheckController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      imports: [UseCaseFactoryModule.register()],
    }).compile();
    healthCheckController = module.get<HealthCheckController>(
      HealthCheckController,
    );
  });

  it('should be defined', () => {
    const result = healthCheckController.health();
    expect(result).toBe('API is running!');
  });
});
