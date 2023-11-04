import { Observable } from 'rxjs';
import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { IActSit } from '@feature/components/act-sit/interfaces/act-sit.interface';

export type FindOneResourceActSit = (
  input: IPaginateDTO
) => Observable<IActSit | undefined>;
