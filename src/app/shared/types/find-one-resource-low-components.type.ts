import { Observable } from 'rxjs';
import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { ILowComponents } from '@feature/components/low-components/interfaces/low-components.interface';

export type FindOneResourceTypeLowComponents = (
  input: IPaginateDTO
) => Observable<ILowComponents | undefined>;
