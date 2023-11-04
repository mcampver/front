import { FormControl } from '@angular/forms';

export interface ICreateFormLowComponents {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
}
