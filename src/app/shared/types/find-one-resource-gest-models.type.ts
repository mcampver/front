import { Observable } from 'rxjs';
import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { IGestModels } from '@feature/components/gest-models/interfaces/gest-models.interface';

export type FindOneResourceTypeGestModels = (
  input: IPaginateDTO
) => Observable<IGestModels | undefined>;
