import { inject, ProviderToken } from '@angular/core';
import { IPaginateDTO } from '../components/data-grid/component/interface';
import { IFindOneResourceServiceMotorTypes } from '../interfaces';
import { FindOneResourceTypeMotorTypes } from '../types';

export const createFindOneResourceFnMotorTypes = <
  T extends IFindOneResourceServiceMotorTypes
>(
  token: ProviderToken<T>
): FindOneResourceTypeMotorTypes => {
  const service: T = inject(token);

  return (input: IPaginateDTO) => service.findOneResource(input);
};
