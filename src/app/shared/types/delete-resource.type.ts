import { Observable } from 'rxjs';

export type DeleteResourceType = (ids: string[]) => Observable<void>;
