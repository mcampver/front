import { inject, ProviderToken } from '@angular/core';
import { IPaginateDTO } from '../components/data-grid/component/interface';
import { IFindOneResourceService } from '@shared/interfaces/find-one-resource-service.interface';
import { FindOneResourceType } from '@shared/types/find-one-resource.type';

export const createFindOneResourceFn = <T extends IFindOneResourceService>(
  token: ProviderToken<T>
): FindOneResourceType => {
  const service: T = inject(token);

  return (input: IPaginateDTO) => service.findOneResource(input);
};
