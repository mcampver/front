// @Autor:Gianni Martinez
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  ISearchFilter,
  ISorting,
  IPaginateOutDTO,
  IServeData,
} from '@shared/components/data-grid/component/interface';

import { delay, of } from 'rxjs';
import { IInvEq } from './interface/inv-eq.interface';

const fakeData: IInvEq[] = [
  {
    id: '000001',
    registration: 'B029071',
    typeEq: 'AU',
    trademark: 'LADA',
    model: '2101',
    serial: '98287',
    actualSit: 'FP',
    state: 'B',
    entity:
      'GRUPO EMPRESARIAL DE DISENO E INGENIERIA DE LA CONSTRUCCION / EMPRESA EXPORTADORA E IMPORTADORA DE EQUIPOS DE CONSTRUCCION, CONSTRUIMPORT',
  },
  {
    id: '000002',
    registration: 'B029069',
    typeEq: 'AU',
    trademark: 'VOLVO',
    model: '740 PASEO',
    serial: '5001472',
    actualSit: 'FP',
    state: 'B',
    entity:
      'GRUPO EMPRESARIAL DE DISENO E INGENIERIA DE LA CONSTRUCCION / EMPRESA EXPORTADORA E IMPORTADORA DE EQUIPOS DE CONSTRUCCION, CONSTRUIMPORT',
  },
  {
    id: '000003',
    registration: 'B029070',
    typeEq: 'OMM',
    trademark: 'HYUNDAI',
    model: 'H1',
    serial: '623088',
    actualSit: 'FP',
    state: 'B',
    entity:
      'GRUPO EMPRESARIAL DE DISENO E INGENIERIA DE LA CONSTRUCCION / EMPRESA EXPORTADORA E IMPORTADORA DE EQUIPOS DE CONSTRUCCION, CONSTRUIMPORT',
  },
];

@Injectable()
export class InvEqService implements IServeData<IInvEq> {
  findAllPagination(
    skip?: number,
    take?: number | undefined,
    sort?: ISorting | undefined,
    dataFilter?: ISearchFilter[],
    dataFilterAnd?: ISearchFilter[]
  ): Observable<IPaginateOutDTO<IInvEq>> {
    return of({
      count: 3,
      items: fakeData,
    }).pipe(delay(10));
  }
}
