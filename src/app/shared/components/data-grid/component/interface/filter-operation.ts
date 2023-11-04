import { ISearchFilter } from './search-filter.interface';

export interface IFilterOperation {
  leftOperation: IFilterOperation | ISearchFilter;
  rightOperation: IFilterOperation | ISearchFilter;
  operationUnion: 'and' | 'or';
}
