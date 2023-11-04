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
import { IPeople } from './interfaces/people.interface';
import { IPeopleCreate } from './interfaces/people-create.interface';
import { IPeopleUpdate } from './interfaces/people-update.interface';
import {
  CREATE_PEOPLE,
  GET_ALL_PEOPLE,
  REMOVE_PEOPLE,
  UPDATE_PEOPLE,
} from './people.queries';

@Injectable()
export class PeopleService implements IServeData<IPeople> {
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
  ): Observable<IPaginateOutDTO<IPeople>> {
    const page: IPaginateDTO = {
      skip,
      take,
      sortField,
      searchFields,
      orSearchFields,
    };
    return this.getPeople(page);
  }

  findOneResource(page: IPaginateDTO): Observable<IPeople | undefined> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_PEOPLE,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getPersonPosition: IPaginateOutDTO<IPeople>;
            }
          ).getPersonPosition.items[0];
        })
      );
  }

  getPeople(page: IPaginateDTO): Observable<IPaginateOutDTO<IPeople>> {
    return this.apollo
      .watchQuery<{ getPersonPosition: IPaginateOutDTO<IPeople> }>({
        query: GET_ALL_PEOPLE,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return data.data.getPersonPosition;
        })
      );
  }

  createPeople(people: IPeopleCreate): Observable<unknown> {
    console.log('Este es el objeto', people);
    return this.apollo.mutate({
      mutation: CREATE_PEOPLE,
      variables: {
        input: people,
      },
    });
  }

  updatePeople(people: IPeopleUpdate): Observable<unknown> {
    console.log('Este es el objeto a actualizar', people);
    return this.apollo.mutate({
      mutation: UPDATE_PEOPLE,
      variables: {
        input: people,
      },
    });
  }

  deletePeople(peoplesIds: string[]) {
    console.log('Estos son los ids a eliminar', peoplesIds);
    return this.apollo.mutate({
      mutation: REMOVE_PEOPLE,
      variables: {
        ids: peoplesIds,
      },
    });
  }
}
