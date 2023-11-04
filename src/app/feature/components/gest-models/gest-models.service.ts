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
import { IGestModels } from './interfaces/gest-models.interface';
import {
  CREATE_MODEL,
  GET_ALL_BRANDS,
  GET_ALL_MODELS,
  GET_ALL_MODELS_WITHOUT_BRAND,
  REMOVE_MODEL,
  UPDATE_MODEL,
} from './gest-models.queries';
import { Apollo } from 'apollo-angular';
import { SnackBarService } from '@core/components/snack-bar/snack-bar.service';
import { IBrand } from '../brands/interfaces/brands.interface';
import { IGestModelsCreate } from './interfaces/gest-models-create.interface';
import { IGestModelsUpdate } from './interfaces/gest-models-update.interface';

@Injectable()
export class GestModelsService implements IServeData<IGestModels> {
  equipsGroup = ['Marítimo', 'Construcción', 'Transporte'];
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
  ): Observable<IPaginateOutDTO<IGestModels>> {
    const page: IPaginateDTO = {
      skip,
      take,
      sortField,
      searchFields,
      orSearchFields,
      select: [{ key: 'model.brand', alias: 'brand' }],
    };
    return this.getModesls(page);
  }

  findOneResource(page: IPaginateDTO): Observable<IGestModels | undefined> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_MODELS_WITHOUT_BRAND,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getModel: IPaginateOutDTO<IGestModels>;
            }
          ).getModel.items[0];
        })
      );
  }

  getModesls(page: IPaginateDTO): Observable<IPaginateOutDTO<IGestModels>> {
    return this.apollo
      .watchQuery<{ getModel: IPaginateOutDTO<IGestModels> }>({
        query: GET_ALL_MODELS,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return data.data.getModel;
        })
      );
  }

  createModels(model: IGestModelsCreate): Observable<unknown> {
    console.log('Este es el objeto', model);
    return this.apollo.mutate({
      mutation: CREATE_MODEL,
      variables: {
        input: model,
      },
    });
  }

  updateModels(model: IGestModelsUpdate): Observable<unknown> {
    console.log('Este es el objeto a actualizar', model);
    return this.apollo.mutate({
      mutation: UPDATE_MODEL,
      variables: {
        input: model,
      },
    });
  }

  deleteModel(modelIds: string[]) {
    console.log('Estos son los ids a eliminar', modelIds);
    return this.apollo.mutate({
      mutation: REMOVE_MODEL,
      variables: {
        ids: modelIds,
      },
    });
  }
}
