/* eslint-disable max-len */
import { Observable } from 'rxjs';
import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { ICountry } from '@feature/components/clas-eq/interface/country.interface';
import { IClasEq } from '@feature/components/clas-eq/interface/clas-eq.interface';

export type FindOneResourceType = (
  input: IPaginateDTO
) => Observable<ICountry | IClasEq | undefined>;
