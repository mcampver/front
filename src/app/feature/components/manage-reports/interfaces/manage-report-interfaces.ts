import { IClasEq } from '@feature/components/clas-eq/interface/clas-eq.interface';

export interface IManageReport {
  readonly id: string;
  readonly noInventary: number;
  readonly original: boolean;
  readonly vin: string;
  readonly tuition: string;
  readonly sNumber: string;
  readonly fundamental: number;
  readonly manofactureYeat: number;
  readonly startUp: number;
  readonly adqValue: number;
  readonly weigth: number;
  readonly useLife: number;
  readonly weigthG: number;
  readonly observation: string;
  readonly sNumberE: string;
  readonly brandModelE: string;
  readonly power: number;
  readonly extent: string;
  readonly rin: number;
  readonly quantity: number;
  readonly voltage: number;
  readonly amperage: number;
  readonly quantityB: number;
  readonly classfier: IClasEq;
}
