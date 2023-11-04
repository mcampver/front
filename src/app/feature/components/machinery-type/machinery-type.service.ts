// @Autor:Gianni Martinez
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  ISearchFilter,
  ISorting,
  IPaginateOutDTO,
  IServeData,
  IPaginateDTO,
} from '@shared/components/data-grid/component/interface';

import { map, take } from 'rxjs';
import {
  CREATE_MACHINERY_TYPES,
  GET_ALL_MACHINERY_TYPES,
  REMOVE_MACHINERY_TYPES,
  UPDATE_MACHINERY_TYPES,
} from './machinery-type.queries';
import { Apollo } from 'apollo-angular';
import { SnackBarService } from '@core/components/snack-bar/snack-bar.service';
import { IMachineryType } from './interfaces/machinery-type.interface';
import { IMachineryTypeCreate } from './interfaces/machinery-type-create.interface';
import { IMachineryTypeUpdate } from './interfaces/machinery-type-update.interface';

@Injectable()
export class MachineryTypeService implements IServeData<IMachineryType> {
  constructor(
    private apollo: Apollo,
    private readonly snackBarService: SnackBarService
  ) {}

  findAllPagination(
    skip?: number,
    take?: number | undefined,
    sortField?: ISorting | undefined,
    searchFields?: ISearchFilter[],
    orSearchFields?: ISearchFilter[]
  ): Observable<IPaginateOutDTO<IMachineryType>> {
    const page: IPaginateDTO = {
      skip,
      take,
      sortField,
      searchFields,
      orSearchFields,
    };
    return this.getMachineryType(page);
  }

  findOneResource(page: IPaginateDTO): Observable<IMachineryType | undefined> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_MACHINERY_TYPES,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getMachineryType: IPaginateOutDTO<IMachineryType>;
            }
          ).getMachineryType.items[0];
        })
      );
  }

  getMachineryType(
    page: IPaginateDTO
  ): Observable<IPaginateOutDTO<IMachineryType>> {
    return this.apollo
      .watchQuery<{ getMachineryType: IPaginateOutDTO<IMachineryType> }>({
        query: GET_ALL_MACHINERY_TYPES,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return data.data.getMachineryType;
        })
      );
  }

  createMachineryType(
    machineryType: IMachineryTypeCreate
  ): Observable<unknown> {
    console.log('Este es el objeto', machineryType);
    return this.apollo.mutate({
      mutation: CREATE_MACHINERY_TYPES,
      variables: {
        input: machineryType,
      },
    });
  }

  updateMachineryType(
    machineryType: IMachineryTypeUpdate
  ): Observable<unknown> {
    console.log('Este es el objeto a actualizar', machineryType);
    return this.apollo.mutate({
      mutation: UPDATE_MACHINERY_TYPES,
      variables: {
        input: machineryType,
      },
    });
  }

  deleteMachineryType(machineryTypesIds: string[]) {
    console.log('Estos son los ids a eliminar', machineryTypesIds);
    return this.apollo.mutate({
      mutation: REMOVE_MACHINERY_TYPES,
      variables: {
        ids: machineryTypesIds,
      },
    });
  }
}
