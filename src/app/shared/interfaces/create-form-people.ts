import { FormControl } from '@angular/forms';

export interface ICreateFormPeople {
  id: FormControl<string | null>;
  charge: FormControl<string | null>;
}
