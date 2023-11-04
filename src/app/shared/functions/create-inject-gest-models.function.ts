import { inject, ProviderToken } from '@angular/core';
import { IPaginateDTO } from '../components/data-grid/component/interface';
import { IFindOneResourceServiceGestModels } from '../interfaces';
import { FindOneResourceTypeGestModels } from '../types';

export const createFindOneResourceFnGestModels = <
  T extends IFindOneResourceServiceGestModels
>(
  token: ProviderToken<T>
): FindOneResourceTypeGestModels => {
  const service: T = inject(token);

  return (input: IPaginateDTO) => service.findOneResource(input);
};
