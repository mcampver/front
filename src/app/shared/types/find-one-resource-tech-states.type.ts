import { Observable } from 'rxjs';
import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { ITechStates } from '@feature/components/tech-states/interfaces/tech-states.interface';

export type FindOneResourceTypeTechStates = (
  input: IPaginateDTO
) => Observable<ITechStates | undefined>;
