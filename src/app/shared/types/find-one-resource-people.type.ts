import { Observable } from 'rxjs';
import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { IPeople } from '@feature/components/people/interfaces/people.interface';

export type FindOneResourceTypePeople = (
  input: IPaginateDTO
) => Observable<IPeople | undefined>;
