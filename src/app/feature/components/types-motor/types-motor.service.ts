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
import { ITypesMotor } from './interfaces/types-motor.interface';
import {
  CREATE_TYPES_MOTOR,
  GET_ALL_TYPES_MOTOR,
  REMOVE_TYPES_MOTOR,
  UPDATE_TYPES_MOTOR,
} from './types-motor.queries';
import { ITypesMotorCreate } from './interfaces/types-motor-create.interface';
import { ITypesMotorUpdate } from './interfaces/types-motor-update.interface';

@Injectable()
export class TypesMotorService implements IServeData<ITypesMotor> {
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
  ): Observable<IPaginateOutDTO<ITypesMotor>> {
    const page: IPaginateDTO = {
      skip,
      take,
      sortField,
      searchFields,
      orSearchFields,
    };
    return this.getTypesMotor(page);
  }

  findOneResource(page: IPaginateDTO): Observable<ITypesMotor | undefined> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_TYPES_MOTOR,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getEngineType: IPaginateOutDTO<ITypesMotor>;
            }
          ).getEngineType.items[0];
        })
      );
  }

  getTypesMotor(page: IPaginateDTO): Observable<IPaginateOutDTO<ITypesMotor>> {
    return this.apollo
      .watchQuery<{ getEngineType: IPaginateOutDTO<ITypesMotor> }>({
        query: GET_ALL_TYPES_MOTOR,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return data.data.getEngineType;
        })
      );
  }

  createTypesMotor(typeMotor: ITypesMotorCreate): Observable<unknown> {
    console.log('Este es el objeto', typeMotor);
    return this.apollo.mutate({
      mutation: CREATE_TYPES_MOTOR,
      variables: {
        input: typeMotor,
      },
    });
  }

  updateTypesMotor(typeMotor: ITypesMotorUpdate): Observable<unknown> {
    console.log('Este es el objeto a actualizar', typeMotor);
    return this.apollo.mutate({
      mutation: UPDATE_TYPES_MOTOR,
      variables: {
        input: typeMotor,
      },
    });
  }

  deleteTypesMotor(typesMotorIds: string[]) {
    console.log('Estos son los ids a eliminar', typesMotorIds);
    return this.apollo.mutate({
      mutation: REMOVE_TYPES_MOTOR,
      variables: {
        ids: typesMotorIds,
      },
    });
  }
}
