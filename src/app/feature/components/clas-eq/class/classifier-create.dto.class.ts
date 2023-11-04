import { IEquipTypes } from '@feature/components/equip-types/interfaces/equip-types.interface';
import { ICountry } from '../interface/country.interface';
import { IMachineryType } from '@feature/components/machinery-type/interfaces/machinery-type.interface';
import { IBrand } from '@feature/components/brands/interfaces/brands.interface';
import { IGestModels } from '@feature/components/gest-models/interfaces/gest-models.interface';
import { IClasEq } from '../interface/clas-eq.interface';

export class ClassifierCreateDto {
  public code: string;
  public country?: ICountry;
  public equipmentType?: IEquipTypes;
  public machineryType?: IMachineryType;
  public brand?: IBrand;
  public model?: IGestModels;
  public serial: boolean;
  public tuition: boolean;
  public c32: boolean;
  public rutePaper: boolean;
  public simpleRutePaper: boolean;

  constructor(element?: Partial<IClasEq>) {
    this.code = element?.code ?? '';
    this.country = element?.country;
    this.equipmentType = element?.equipmentType;
    this.machineryType = element?.machineryType;
    this.brand = element?.brand;
    this.model = element?.model;
    this.serial = element?.serial ?? false;
    this.tuition = element?.tuition ?? false;
    this.c32 = element?.c32 ?? false;
    this.rutePaper = element?.rutePaper ?? false;
    this.simpleRutePaper = element?.simpleRutePaper ?? false;
  }
}
