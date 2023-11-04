import { IPaginateDTO } from '@shared/components/data-grid/component/interface/paginate.interface';
import { Observable } from 'rxjs';

export interface IDatasourceAC<T> {
  load: (option: IPaginateDTO) => Observable<T> | undefined;
}
