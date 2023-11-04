import { Observable } from 'rxjs';
import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { ITypesMotor } from '@feature/components/types-motor/interfaces/types-motor.interface';

export type FindOneResourceTypeMotorTypes = (
  input: IPaginateDTO
) => Observable<ITypesMotor | undefined>;
