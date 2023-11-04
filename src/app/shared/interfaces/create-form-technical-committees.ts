import { FormControl } from '@angular/forms';

export interface ICreateFormGroupTechnicalCommittees {
  name: FormControl<string | null>;
  theFunction: FormControl<string | null>;
  resolution: FormControl<string | null>;
}
