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
import { IActSit } from './interfaces/act-sit.interface';
import { IActSitCreate } from './interfaces/act-sit-create.interface';
import { IActSitUpdate } from './interfaces/act-sit-update.interface';
import {
  CREATE_ACT_SIT,
  GET_ALL_ACT_SIT,
  REMOVE_ACT_SIT,
  UPDATE_ACT_SIT,
} from './act-sit.queries';

@Injectable()
export class ActSitService implements IServeData<IActSit> {
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
  ): Observable<IPaginateOutDTO<IActSit>> {
    const page: IPaginateDTO = {
      skip,
      take,
      sortField,
      searchFields,
      orSearchFields,
    };
    return this.getCurrentSituation(page);
  }

  findOneResource(page: IPaginateDTO): Observable<IActSit | undefined> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_ACT_SIT,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getCurrentSituation: IPaginateOutDTO<IActSit>;
            }
          ).getCurrentSituation.items[0];
        })
      );
  }

  getCurrentSituation(
    page: IPaginateDTO
  ): Observable<IPaginateOutDTO<IActSit>> {
    return this.apollo
      .watchQuery<{ getCurrentSituation: IPaginateOutDTO<IActSit> }>({
        query: GET_ALL_ACT_SIT,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return data.data.getCurrentSituation;
        })
      );
  }

  createCurrentSituation(currentSituation: IActSitCreate): Observable<unknown> {
    console.log('Este es el objeto', currentSituation);
    return this.apollo.mutate({
      mutation: CREATE_ACT_SIT,
      variables: {
        input: currentSituation,
      },
    });
  }

  updateCurrentSituation(currentSituation: IActSitUpdate): Observable<unknown> {
    console.log('Este es el objeto a actualizar', currentSituation);
    return this.apollo.mutate({
      mutation: UPDATE_ACT_SIT,
      variables: {
        input: currentSituation,
      },
    });
  }

  deleteCurrentSituation(currentSituationIds: string[]) {
    console.log('Estos son los ids a eliminar', currentSituationIds);
    return this.apollo.mutate({
      mutation: REMOVE_ACT_SIT,
      variables: {
        ids: currentSituationIds,
      },
    });
  }
}
