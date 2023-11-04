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
import { IEquipTypes } from './interfaces/equip-types.interface';
import {
  CREATE_EQUIP_TYPES,
  GET_ALL_EQUIPMENT_GROUP,
  GET_ALL_EQUIPMENT_TYPE,
  GET_ALL_EQUIPMENT_TYPE_WITHOUT_EQUIP_GROUP,
  REMOVE_EQUIP_TYPES,
  UPDATE_EQUIP_TYPES,
} from './equip-types.queries';
import { Apollo } from 'apollo-angular';
import { SnackBarService } from '@core/components/snack-bar/snack-bar.service';
import { IEqGroups } from '../eq-groups/interfaces/eq-groups.interface';
import { IEquipTypeCreate } from './interfaces/equip-types-create.interface';
import { IEquipTypesUpdate } from './interfaces/equip-types-update.interface';

@Injectable()
export class EquipTypesService implements IServeData<IEquipTypes> {
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
  ): Observable<IPaginateOutDTO<IEquipTypes>> {
    const page: IPaginateDTO = {
      skip,
      take,
      sortField,
      searchFields,
      orSearchFields,
      select: [
        { key: 'equipmentType.equipmentGroup', alias: 'equipmentGroup' },
      ],
    };
    return this.getEquipTypes(page);
  }

  findOneResource(page: IPaginateDTO): Observable<IEquipTypes | undefined> {
    return this.apollo
      .watchQuery({
        query: GET_ALL_EQUIPMENT_TYPE_WITHOUT_EQUIP_GROUP,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return (
            data.data as {
              getEquipmentType: IPaginateOutDTO<IEquipTypes>;
            }
          ).getEquipmentType.items[0];
        })
      );
  }

  getEquipTypes(page: IPaginateDTO): Observable<IPaginateOutDTO<IEquipTypes>> {
    return this.apollo
      .watchQuery<{ getEquipmentType: IPaginateOutDTO<IEquipTypes> }>({
        query: GET_ALL_EQUIPMENT_TYPE,
        variables: {
          page,
        },
      })
      .valueChanges.pipe(
        take(1),
        map((data) => {
          return data.data.getEquipmentType;
        })
      );
  }

  createEquipType(equipType: IEquipTypeCreate): Observable<unknown> {
    console.log('Este es el objeto', equipType);
    return this.apollo.mutate({
      mutation: CREATE_EQUIP_TYPES,
      variables: {
        input: equipType,
      },
    });
  }

  updateEquipType(equipType: IEquipTypesUpdate): Observable<unknown> {
    console.log('Este es el objeto a actualizar', equipType);
    return this.apollo.mutate({
      mutation: UPDATE_EQUIP_TYPES,
      variables: {
        input: equipType,
      },
    });
  }

  deleteEquipType(equipTypesIds: string[]) {
    console.log('Estos son los ids a eliminar', equipTypesIds);
    return this.apollo.mutate({
      mutation: REMOVE_EQUIP_TYPES,
      variables: {
        ids: equipTypesIds,
      },
    });
  }
}
