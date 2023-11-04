import { IBrand } from '@feature/components/brands/interfaces/brands.interface';
import { ICountry } from './country.interface';
import { IGestModels } from '@feature/components/gest-models/interfaces/gest-models.interface';
import { IEquipTypes } from '@feature/components/equip-types/interfaces/equip-types.interface';
import { IMachineryType } from '@feature/components/machinery-type/interfaces/machinery-type.interface';

// @Autor:Gianni Martinez
export interface IClasEq {
  readonly id: string;
  readonly code: string;
  readonly country: ICountry;
  readonly brand: IBrand;
  readonly model: IGestModels;
  readonly equipmentType: IEquipTypes;
  readonly machineryType: IMachineryType;
  readonly serial: boolean;
  readonly tuition: boolean;
  readonly c32: boolean;
  readonly rutePaper: boolean;
  readonly simpleRutePaper: boolean;
}
