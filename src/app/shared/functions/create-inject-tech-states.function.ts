import { inject, ProviderToken } from '@angular/core';
import { IPaginateDTO } from '../components/data-grid/component/interface';
import { IFindOneResourceServiceTechStates } from '../interfaces';
import { FindOneResourceTypeTechStates } from '../types';

export const createFindOneResourceFnTechStates = <
  T extends IFindOneResourceServiceTechStates
>(
  token: ProviderToken<T>
): FindOneResourceTypeTechStates => {
  const service: T = inject(token);

  return (input: IPaginateDTO) => service.findOneResource(input);
};
