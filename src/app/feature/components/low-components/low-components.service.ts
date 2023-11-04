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
import { Apollo } from 'apollo-angular';
import { SnackBarService } from '@core/components/snack-bar/snack-bar.service';
import { ILowComponents } from './interfaces/low-components.interface';
import { ILowComponentsCreate } from './interfaces/low-components-create.interface';
import { ILowComponentsUpdate } from './interfaces/low-components-update.interface';
import {
  CREATE_LOW_COMPONENTS,
  GET_ALL_LOW_COMPONENTS,
  REMOVE_LOW_COMPONENTS,
  UPDATE_LOW_COMPONENTS,
} from './low-components.queries';

@Injectable()
export class LowComponentsService implements IServeData<ILowComponents> {
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
  ): Observable<IPaginateOutDTO<ILowComponents>> {
    const page: IPaginateDTO = {
      skip,
      take,
      sortField,
      searchFields,
      orSearchFields,
    };
    return this.getLowComponents(page);
  }

  findOneResource(page: IPaginateDTO): Observable<ILowComponents | undefined> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_LOW_COMPONENTS,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getTechnicalState: IPaginateOutDTO<ILowComponents>;
            }
          ).getTechnicalState.items[0];
        })
      );
  }

  getLowComponents(
    page: IPaginateDTO
  ): Observable<IPaginateOutDTO<ILowComponents>> {
    return this.apollo
      .watchQuery<{ getDowngradeComponent: IPaginateOutDTO<ILowComponents> }>({
        query: GET_ALL_LOW_COMPONENTS,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return data.data.getDowngradeComponent;
        })
      );
  }

  createLowComponents(lowComponent: ILowComponentsCreate): Observable<unknown> {
    console.log('Este es el objeto', lowComponent);
    return this.apollo.mutate({
      mutation: CREATE_LOW_COMPONENTS,
      variables: {
        input: lowComponent,
      },
    });
  }

  updateLowComponents(lowComponent: ILowComponentsUpdate): Observable<unknown> {
    console.log('Este es el objeto a actualizar', lowComponent);
    return this.apollo.mutate({
      mutation: UPDATE_LOW_COMPONENTS,
      variables: {
        input: lowComponent,
      },
    });
  }

  deleteLowComponents(lowComponentIds: string[]) {
    console.log('Estos son los ids a eliminar', lowComponentIds);
    return this.apollo.mutate({
      mutation: REMOVE_LOW_COMPONENTS,
      variables: {
        ids: lowComponentIds,
      },
    });
  }
}
