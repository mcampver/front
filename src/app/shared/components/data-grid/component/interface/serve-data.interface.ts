import { ISorting } from './sorting.interface';
import { ISearchFilter } from './search-filter.interface';
import { Observable } from 'rxjs';
import { IPaginateOutDTO } from './paginate-out.interface';

export interface IServeData<T> {
  findAllPagination(
    skip?: number,
    take?: number | undefined,
    sort?: ISorting | undefined,
    dataFilter?: ISearchFilter[]
  ): Observable<IPaginateOutDTO<T>>;
}
