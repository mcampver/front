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
  CREATE_BRAND,
  GET_ALL_BRAND,
  REMOVE_BRAND,
  UPDATE_BRAND,
} from './brands.queries';
import { Apollo } from 'apollo-angular';
import { SnackBarService } from '@core/components/snack-bar/snack-bar.service';
import { IBrand } from './interfaces/brands.interface';
import { IBrandCreate } from './interfaces/brands-create.interface';
import { IBrandUpdate } from './interfaces/brands-update.interface';

@Injectable()
export class BrandService implements IServeData<IBrand> {
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
  ): Observable<IPaginateOutDTO<IBrand>> {
    const page: IPaginateDTO = {
      skip,
      take,
      sortField,
      searchFields,
      orSearchFields,
    };
    return this.getBrands(page);
  }

  findOneResource(page: IPaginateDTO): Observable<IBrand | undefined> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_BRAND,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getBrand: IPaginateOutDTO<IBrand>;
            }
          ).getBrand.items[0];
        })
      );
  }

  getBrands(page: IPaginateDTO): Observable<IPaginateOutDTO<IBrand>> {
    return this.apollo
      .watchQuery<{ getBrand: IPaginateOutDTO<IBrand> }>({
        query: GET_ALL_BRAND,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return data.data.getBrand;
        })
      );
  }

  createBrand(brand: IBrandCreate): Observable<unknown> {
    console.log('Este es el objeto', brand);
    return this.apollo.mutate({
      mutation: CREATE_BRAND,
      variables: {
        input: brand,
      },
    });
  }

  updateBrand(brand: IBrandUpdate): Observable<unknown> {
    console.log('Este es el objeto a actualizar', brand);
    return this.apollo.mutate({
      mutation: UPDATE_BRAND,
      variables: {
        input: brand,
      },
    });
  }

  deleteBrand(brandsIds: string[]) {
    console.log('Estos son los ids a eliminar', brandsIds);
    return this.apollo.mutate({
      mutation: REMOVE_BRAND,
      variables: {
        ids: brandsIds,
      },
    });
  }
}
