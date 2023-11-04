import { FormControl } from '@angular/forms';

export interface ICreateFormInvEq {
  id: FormControl<string | null>;
  registration: FormControl<string | null>;
  typeEq: FormControl<string | null>;
  trademark: FormControl<string | null>;
  model: FormControl<string | null>;
  serial: FormControl<string | null>;
  actualSit: FormControl<string | null>;
  state: FormControl<string | null>;
  entity: FormControl<string | null>;
}
