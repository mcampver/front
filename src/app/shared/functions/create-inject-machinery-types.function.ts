import { inject, ProviderToken } from '@angular/core';
import { IPaginateDTO } from '../components/data-grid/component/interface';
import { IFindOneResourceServiceMachineryType } from '../interfaces';
import { FindOneResourceMachineryTypeTypes } from '../types';

export const createFindOneResourceFnMachineryTypes = <
  T extends IFindOneResourceServiceMachineryType
>(
  token: ProviderToken<T>
): FindOneResourceMachineryTypeTypes => {
  const service: T = inject(token);

  return (input: IPaginateDTO) => service.findOneResource(input);
};
