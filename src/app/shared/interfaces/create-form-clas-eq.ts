import { AbstractControl, FormControl } from '@angular/forms';
import { IBrand } from '@feature/components/brands/interfaces/brands.interface';
import { ICountry } from '@feature/components/clas-eq/interface/country.interface';
import { IEquipTypes } from '@feature/components/equip-types/interfaces/equip-types.interface';
import { IGestModels } from '@feature/components/gest-models/interfaces/gest-models.interface';
import { IMachineryType } from '@feature/components/machinery-type/interfaces/machinery-type.interface';

export interface ICreateFormClasEq {
  [key: string]: AbstractControl<any, any>;
  code: FormControl<string>;
  serial: FormControl<boolean>;
  tuition: FormControl<boolean>;
  c32: FormControl<boolean>;
  rutePaper: FormControl<boolean>;
  simpleRutePaper: FormControl<boolean>;
  country: FormControl<ICountry>;
  brand: FormControl<IBrand>;
  model: FormControl<IGestModels>;
  equipmentType: FormControl<IEquipTypes>;
  machineryType: FormControl<IMachineryType>;
}
