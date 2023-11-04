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
import { IEqGroups } from './interfaces/eq-groups.interface';
import {
  CREATE_EQ_GROUPS,
  GET_ALL_EQ_GROUPS,
  REMOVE_EQ_GROUPS,
  UPDATE_EQ_GROUPS,
} from './eq-groups.queries';
import { SnackBarService } from '@core/components/snack-bar/snack-bar.service';
import { Apollo } from 'apollo-angular';
import { IEqGroupsCreate } from './interfaces/eq-groups-create.interface';
import { IEqGroupsUpdate } from './interfaces/eq-groups-update.interface';

@Injectable()
export class EqGroupsService implements IServeData<IEqGroups> {
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
  ): Observable<IPaginateOutDTO<IEqGroups>> {
    const page: IPaginateDTO = {
      skip,
      take,
      sortField,
      searchFields,
      orSearchFields,
    };
    return this.getEqGroups(page);
  }

  findOneResource(page: IPaginateDTO): Observable<IEqGroups | undefined> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_EQ_GROUPS,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getEquipmentGroup: IPaginateOutDTO<IEqGroups>;
            }
          ).getEquipmentGroup.items[0];
        })
      );
  }

  getEqGroups(page: IPaginateDTO): Observable<IPaginateOutDTO<IEqGroups>> {
    return this.apollo
      .watchQuery<{ getEquipmentGroup: IPaginateOutDTO<IEqGroups> }>({
        query: GET_ALL_EQ_GROUPS,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return data.data.getEquipmentGroup;
        })
      );
  }

  createEqGroups(eqGroup: IEqGroupsCreate): Observable<unknown> {
    return this.apollo.mutate({
      mutation: CREATE_EQ_GROUPS,
      variables: {
        input: eqGroup,
      },
    });
  }

  updateEqGroups(eqGroup: IEqGroupsUpdate): Observable<unknown> {
    return this.apollo.mutate({
      mutation: UPDATE_EQ_GROUPS,
      variables: {
        input: eqGroup,
      },
    });
  }

  deleteEqGroups(eqGroupsIds: string[]) {
    return this.apollo.mutate({
      mutation: REMOVE_EQ_GROUPS,
      variables: {
        ids: eqGroupsIds,
      },
    });
  }
}
