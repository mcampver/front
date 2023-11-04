import { FormControl } from '@angular/forms';

export interface ICreateFormGestModels {
  name: FormControl<string | null>;
  code: FormControl<string | null>;
  brand: FormControl<string | null>;
}
