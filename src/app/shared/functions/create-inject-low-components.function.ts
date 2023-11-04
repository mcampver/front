// import { inject, ProviderToken } from '@angular/core';
// import { IPaginateDTO } from '../components/data-grid/component/interface';
// import { IFindOneResourceServiceLowComponents } from '../interfaces';
// import { FindOneResourceTypeLowComponents } from '../types';

// export const createFindOneResourceFnLowComponents = <
//   T extends IFindOneResourceServiceLowComponents
// >(
//   token: ProviderToken<T>
// ): FindOneResourceTypeLowComponents => {
//   const service: T = inject(token);

//   return (input: IPaginateDTO) => service.findOneResource(input);
// };
import { inject, ProviderToken } from '@angular/core';
import { IPaginateDTO } from '../components/data-grid/component/interface';
import { IFindOneResourceServiceLowComponents } from '../interfaces';
import { FindOneResourceTypeLowComponents } from '../types';

export const createFindOneResourceFnLowComponents = <
  T extends IFindOneResourceServiceLowComponents
>(
  token: ProviderToken<T>
): FindOneResourceTypeLowComponents => {
  const service: T = inject(token);
  console.log((input: IPaginateDTO) => service.findOneResource(input));

  return (input: IPaginateDTO) => service.findOneResource(input);
};
