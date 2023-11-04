import { Observable } from 'rxjs';
import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { IEquipTypes } from '@feature/components/equip-types/interfaces/equip-types.interface';

export type FindOneResourceTypeEquipTypes = (
  input: IPaginateDTO
) => Observable<IEquipTypes | undefined>;
