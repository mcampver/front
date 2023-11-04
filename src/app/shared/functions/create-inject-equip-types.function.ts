import { inject, ProviderToken } from '@angular/core';
import { IPaginateDTO } from '../components/data-grid/component/interface';
import { IFindOneResourceServiceEquipTypes } from '../interfaces';
import { FindOneResourceTypeEquipTypes } from '../types';

export const createFindOneResourceFnEquipTypes = <
  T extends IFindOneResourceServiceEquipTypes
>(
  token: ProviderToken<T>
): FindOneResourceTypeEquipTypes => {
  const service: T = inject(token);

  return (input: IPaginateDTO) => service.findOneResource(input);
};
