import { Observable } from 'rxjs';
import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { IBrand } from '@feature/components/brands/interfaces/brands.interface';

export type FindOneResourceTypeBrand = (
  input: IPaginateDTO
) => Observable<IBrand | undefined>;
