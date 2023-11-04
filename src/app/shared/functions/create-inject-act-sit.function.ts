import { inject, ProviderToken } from '@angular/core';
import { IPaginateDTO } from '../components/data-grid/component/interface';
import { IFindOneResourceServiceActSit } from '../interfaces';
import { FindOneResourceActSit } from '../types';

export const createFindOneResourceFnActSit = <
  T extends IFindOneResourceServiceActSit
>(
  token: ProviderToken<T>
): FindOneResourceActSit => {
  const service: T = inject(token);

  return (input: IPaginateDTO) => service.findOneResource(input);
};
