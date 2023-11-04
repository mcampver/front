import { inject, ProviderToken } from '@angular/core';
import { IPaginateDTO } from '../components/data-grid/component/interface';
import { IFindOneResourceServiceEqGroups } from '../interfaces';
import { FindOneResourceTypeEqGroups } from '../types';

export const createFindOneResourceFnEqGroups = <
  T extends IFindOneResourceServiceEqGroups
>(
  token: ProviderToken<T>
): FindOneResourceTypeEqGroups => {
  const service: T = inject(token);

  return (input: IPaginateDTO) => service.findOneResource(input);
};
