import { FormControl } from '@angular/forms';

export interface ICreateFormGroup {
  description: FormControl<string | null>;
  price: FormControl<number | null>;
}
