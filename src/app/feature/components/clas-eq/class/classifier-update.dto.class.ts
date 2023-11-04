import { IBrand } from '@feature/components/brands/interfaces/brands.interface';
import { IEquipTypes } from '@feature/components/equip-types/interfaces/equip-types.interface';
import { IGestModels } from '@feature/components/gest-models/interfaces/gest-models.interface';
import { IMachineryType } from '@feature/components/machinery-type/interfaces/machinery-type.interface';
import { ICountry } from '../interface/country.interface';

export class ClassifierUpdateDto {
  constructor(
    public id: string,
    public code?: string,
    public country?: ICountry,
    public equipmentType?: IEquipTypes,
    public machineryType?: IMachineryType,
    public brand?: IBrand,
    public model?: IGestModels,
    public serial?: boolean,
    public tuition?: boolean,
    public c32?: boolean,
    public rutePaper?: boolean,
    public simpleRutePaper?: boolean
  ) {}
}
