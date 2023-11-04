import { Injectable } from '@angular/core';
import { IClasEq } from '../interface/clas-eq.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { ICountry } from '../interface/country.interface';
import { IBrand } from '@feature/components/brands/interfaces/brands.interface';
import { ICreateFormClasEq } from '@shared/interfaces/create-form-clas-eq';
import { ClassifierCreateDto } from '../class/classifier-create.dto.class';
import { IEquipTypes } from '@feature/components/equip-types/interfaces/equip-types.interface';
import { IMachineryType } from '@feature/components/machinery-type/interfaces/machinery-type.interface';
import { IGestModels } from '@feature/components/gest-models/interfaces/gest-models.interface';
import { CCodeControl } from '@shared/controls/c-code.control';
import { CBooleanControl } from '@shared/controls/c-boolean.control';
import { IDatasourceAC } from '@shared/auto-complete/datasource-ac.interface';
import { IPaginateOutDTO } from '@shared/components/data-grid/component/interface';

@Injectable()
export class ModalPresenter extends FormGroup<ICreateFormClasEq> {
  fieldValueE = '';
  equipmentTypeDataSource:
    | IDatasourceAC<IPaginateOutDTO<IEquipTypes>>
    | undefined;

  fieldsEquipmentType = ['equipmentType.name'];

  fieldValueC = '';
  countryDataSource: IDatasourceAC<IPaginateOutDTO<ICountry>> | undefined;

  fieldsCountry = ['country.name'];

  fieldValueMo = '';
  modelDataSource: IDatasourceAC<IPaginateOutDTO<IGestModels>> | undefined;

  fieldsModel = ['model.name'];

  fieldValueB = '';
  brandDataSource: IDatasourceAC<IPaginateOutDTO<IBrand>> | undefined;

  fieldsBrand = ['brand.name'];

  fieldValueMa = '';
  machineryTypeDataSource:
    | IDatasourceAC<IPaginateOutDTO<IMachineryType>>
    | undefined;

  fieldsMachineryType = ['machineryType.name'];
  constructor() {
    super({
      code: new CCodeControl(),
      serial: new CBooleanControl(),
      tuition: new CBooleanControl(),
      c32: new CBooleanControl(),
      rutePaper: new CBooleanControl(),
      simpleRutePaper: new CBooleanControl(),
      country: new FormControl<ICountry>({} as ICountry, {
        nonNullable: true,
      }),
      brand: new FormControl<IBrand>({} as IBrand, { nonNullable: true }),
      equipmentType: new FormControl<IEquipTypes>({} as IEquipTypes, {
        nonNullable: true,
      }),
      machineryType: new FormControl<IMachineryType>({} as IMachineryType, {
        nonNullable: true,
      }),
      model: new FormControl<IGestModels>({} as IGestModels, {
        nonNullable: true,
      }),
    });
  }

  get classifierDataForm(): ClassifierCreateDto {
    return new ClassifierCreateDto(this.value);
  }

  fillData(data: IClasEq): void {
    this.patchValue(data);
  }

  hasErrorByControl(
    field: keyof ICreateFormClasEq,
    errorName: string
  ): boolean {
    return this.controls[field].hasError(errorName);
  }

  showExprE(equipmentType: IEquipTypes): string {
    if (!equipmentType) return '';
    return `${equipmentType?.name}`;
  }

  showExprC(country: ICountry): string {
    if (!country) return '';
    return `${country?.name}`;
  }

  showExprMo(model: IGestModels): string {
    if (!model) return '';
    return `${model?.name}`;
  }

  showExprB(brand: IBrand): string {
    if (!brand) return '';
    return `${brand?.name}`;
  }

  showExprMa(machineryType: IMachineryType): string {
    if (!machineryType) return '';
    return `${machineryType?.name}`;
  }
}
