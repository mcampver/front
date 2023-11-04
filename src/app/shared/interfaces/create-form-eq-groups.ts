import { FormControl } from '@angular/forms';

export interface ICreateFormEqGroups {
  code: FormControl<string | null>;
  name: FormControl<string | null>;
  initials: FormControl<string | null>;
}
