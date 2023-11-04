import { Observable } from 'rxjs';
import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { IMachineryType } from '@feature/components/machinery-type/interfaces/machinery-type.interface';

export type FindOneResourceMachineryTypeTypes = (
  input: IPaginateDTO
) => Observable<IMachineryType | undefined>;
