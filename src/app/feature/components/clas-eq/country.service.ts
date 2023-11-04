import { Injectable } from '@angular/core';
import { SnackBarService } from '@core/components/snack-bar/snack-bar.service';
import {
  IServeData,
  ISorting,
  ISearchFilter,
  IPaginateOutDTO,
  IPaginateDTO,
} from '@shared/components/data-grid/component/interface';
import { IFindOneResourceService } from '@shared/interfaces/find-one-resource-service.interface';
import { Apollo } from 'apollo-angular';
import { Observable, take, map } from 'rxjs';
import {
  FIND_ALL_PAGINATION_COUNTRY,
  FIND_ONE_BY_ID_COUNTRY,
} from './country.queries';
import { ICountry } from './interface/country.interface';

@Injectable()
export class CountryService
  implements IServeData<ICountry>, IFindOneResourceService
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
  ): Observable<IPaginateOutDTO<ICountry>> {
    const page: IPaginateDTO = {
      skip,
      take: takeData,
      sortField,
      searchFields,
      orSearchFields,
    };
    return this.apollo
      .watchQuery({
        query: FIND_ALL_PAGINATION_COUNTRY,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getDocMincon: IPaginateOutDTO<ICountry>;
            }
          ).getDocMincon;
        })
      );
  }

  findOneById(id: string) {
    return this.apollo
      .watchQuery({
        query: FIND_ONE_BY_ID_COUNTRY,
        variables: {
          id,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              findOne: ICountry;
            }
          ).findOne;
        })
      );
  }

  findOneResource(page: IPaginateDTO): Observable<ICountry | undefined> {
    return this.apollo
      .watchQuery({
        query: FIND_ALL_PAGINATION_COUNTRY,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getDocMincon: IPaginateOutDTO<ICountry>;
            }
          ).getDocMincon.items[0];
        })
      );
  }
}
