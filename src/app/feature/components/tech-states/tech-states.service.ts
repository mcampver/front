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
import { ITechStates } from './interfaces/tech-states.interface';
import { ITechStatesCreate } from './interfaces/tech-states-create.interface';
import { ITechStatesUpdate } from './interfaces/tech-states-update.interface';
import {
  CREATE_TECH_STATES,
  GET_ALL_TECH_STATES,
  REMOVE_TECH_STATES,
  UPDATE_TECH_STATES,
} from './tech-states.queries';

@Injectable()
export class TechStatesService implements IServeData<ITechStates> {
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
  ): Observable<IPaginateOutDTO<ITechStates>> {
    const page: IPaginateDTO = {
      skip,
      take,
      sortField,
      searchFields,
      orSearchFields,
    };
    return this.getTechincalState(page);
  }

  findOneResource(page: IPaginateDTO): Observable<ITechStates | undefined> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_TECH_STATES,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getTechnicalState: IPaginateOutDTO<ITechStates>;
            }
          ).getTechnicalState.items[0];
        })
      );
  }

  getTechincalState(
    page: IPaginateDTO
  ): Observable<IPaginateOutDTO<ITechStates>> {
    return this.apollo
      .watchQuery<{ getTechnicalState: IPaginateOutDTO<ITechStates> }>({
        query: GET_ALL_TECH_STATES,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return data.data.getTechnicalState;
        })
      );
  }

  createTechincalState(
    technicalSituation: ITechStatesCreate
  ): Observable<unknown> {
    console.log('Este es el objeto', technicalSituation);
    return this.apollo.mutate({
      mutation: CREATE_TECH_STATES,
      variables: {
        input: technicalSituation,
      },
    });
  }

  updateTechincalState(
    technicalSituation: ITechStatesUpdate
  ): Observable<unknown> {
    console.log('Este es el objeto a actualizar', technicalSituation);
    return this.apollo.mutate({
      mutation: UPDATE_TECH_STATES,
      variables: {
        input: technicalSituation,
      },
    });
  }

  deleteTechincalState(technicalSituationIds: string[]) {
    console.log('Estos son los ids a eliminar', technicalSituationIds);
    return this.apollo.mutate({
      mutation: REMOVE_TECH_STATES,
      variables: {
        ids: technicalSituationIds,
      },
    });
  }
}
