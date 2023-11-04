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
import { IClasEq } from './interface/clas-eq.interface';
import {
  CREATE_EQUIPMENT_CLASSIFIER,
  FIND_ALL_PAGINATION_EQUIMENT_CLASSIFIER,
  FIND_ONE_BY_ID_EQUIPMENT_CLASSIFIER,
  REMOVE_EQUIPMENT_CLASSIFIER,
  UPDATE_EQUIPMENT_CLASSIFIER,
} from './clas-eq.queries';
import { IFindOneResourceService } from '@shared/interfaces/find-one-resource-service.interface';
import { Apollo } from 'apollo-angular';
import { SnackBarService } from '@core/components/snack-bar/snack-bar.service';
import { ClassifierCreateDto } from './class/classifier-create.dto.class';
import { ClassifierUpdateDto } from './class/classifier-update.dto.class';
import { SnackBarMessageEnum } from '@shared/enums/snack-bar-message.enum copy';

@Injectable()
export class ClasEqService
  implements IServeData<IClasEq>, IFindOneResourceService
{
  constructor(
    private apollo: Apollo,
    private readonly snackBarService: SnackBarService
  ) {}

  findAllPagination(
    skip?: number,
    takeData?: number | undefined,
    sortField?: ISorting | undefined,
    searchFields?: ISearchFilter[],
    orSearchFields?: ISearchFilter[]
  ): Observable<IPaginateOutDTO<IClasEq>> {
    const page: IPaginateDTO = {
      skip,
      take: takeData,
      sortField,
      select: [
        { key: 'classifier.country', alias: 'country' },
        { key: 'classifier.equipmentType', alias: 'equipmentType' },
        { key: 'classifier.machineryType', alias: 'machineryType' },
        { key: 'classifier.brand', alias: 'brand' },
        { key: 'classifier.model', alias: 'model' },
      ],
      searchFields,
      orSearchFields,
    };
    return this.apollo
      .watchQuery({
        query: FIND_ALL_PAGINATION_EQUIMENT_CLASSIFIER,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getEquipmentClassfier: IPaginateOutDTO<IClasEq>;
            }
          ).getEquipmentClassfier;
        })
      );
  }

  findOneById(id: string) {
    return this.apollo
      .watchQuery({
        query: FIND_ONE_BY_ID_EQUIPMENT_CLASSIFIER,
        variables: {
          id,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              findOne: IClasEq;
            }
          ).findOne;
        })
      );
  }

  findOneResource(page: IPaginateDTO): Observable<IClasEq | undefined> {
    return this.apollo
      .watchQuery({
        query: FIND_ALL_PAGINATION_EQUIMENT_CLASSIFIER,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getEquipmentClassifier: IPaginateOutDTO<IClasEq>;
            }
          ).getEquipmentClassifier.items[0];
        })
      );
  }

  create(classifier: ClassifierCreateDto) {
    return this.apollo
      .mutate({
        mutation: CREATE_EQUIPMENT_CLASSIFIER,
        variables: {
          input: classifier,
        },
      })
      .pipe(
        take(1),
        map((data) => {
          this.snackBarService.openSnackBar(
            SnackBarMessageEnum.CREATE_SUCCESSFUL
          );
          return (
            data.data as {
              createEquipmentClassifier: IClasEq;
            }
          ).createEquipmentClassifier;
        })
      );
  }

  edit(classifier: ClassifierUpdateDto) {
    return this.apollo
      .mutate({
        mutation: UPDATE_EQUIPMENT_CLASSIFIER,
        variables: {
          input: classifier,
        },
      })
      .pipe(
        take(1),
        map((data) => {
          this.snackBarService.openSnackBar(
            SnackBarMessageEnum.UPDATE_SUCCESSFUL
          );
          return (
            data.data as {
              createEquipmentClassfier: IClasEq;
            }
          ).createEquipmentClassfier;
        })
      );
  }

  remove(ids: string[]) {
    return this.apollo
      .mutate({
        mutation: REMOVE_EQUIPMENT_CLASSIFIER,
        variables: {
          ids,
        },
      })
      .pipe(
        take(1),
        map(() => {
          this.snackBarService.openSnackBar(
            SnackBarMessageEnum.DELETE_SUCCESSFUL
          );
        })
      );
  }
}
