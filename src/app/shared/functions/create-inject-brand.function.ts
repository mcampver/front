import { inject, ProviderToken } from '@angular/core';
import { IPaginateDTO } from '../components/data-grid/component/interface';
import { IFindOneResourceServiceBrand } from '../interfaces';
import { FindOneResourceTypeBrand } from '../types';

export const createFindOneResourceFnBrand = <
  T extends IFindOneResourceServiceBrand
>(
  token: ProviderToken<T>
): FindOneResourceTypeBrand => {
  const service: T = inject(token);

  return (input: IPaginateDTO) => service.findOneResource(input);
};
