import { Observable } from 'rxjs';
import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { IEqGroups } from '@feature/components/eq-groups/interfaces/eq-groups.interface';

export type FindOneResourceTypeEqGroups = (
  input: IPaginateDTO
) => Observable<IEqGroups | undefined>;
