import ValidationPipeCommons from '../../../../src/infra/commons/validation-pipe.commons';
import { BadRequestException } from '@nestjs/common';

describe('Given ValidationPipeCommons', () => {
  let validationPipeCommons: any;
  beforeEach(async () => {
    validationPipeCommons = ValidationPipeCommons();
  });
  it('When call to validation Pipe Should return Bad request result', async () => {
    const mock = [
      {
        target: {
          name: '',
          alias: '',
          quotes: [{ alias: 'USD', price: 5.0557 }],
        },
        value: '',
        property: 'name',
        children: [],
        constraints: { isNotEmpty: 'name should not be empty' },
      },
    ];

    const exceptionResult = [
      {
        property: 'name',
        message: 'name should not be empty',
      },
      {
        property: 'alias',
        message: 'alias should not be empty',
      },
    ];
    const result = validationPipeCommons.exceptionFactory(mock);
    expect(result).toEqual(new BadRequestException(exceptionResult));
  });
});
