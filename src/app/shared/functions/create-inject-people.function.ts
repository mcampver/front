import { inject, ProviderToken } from '@angular/core';
import { IPaginateDTO } from '../components/data-grid/component/interface';
import { IFindOneResourceServicePeople } from '../interfaces';
import { FindOneResourceTypePeople } from '../types';

export const createFindOneResourceFnPeople = <
  T extends IFindOneResourceServicePeople
>(
  token: ProviderToken<T>
): FindOneResourceTypePeople => {
  const service: T = inject(token);

  return (input: IPaginateDTO) => service.findOneResource(input);
};
