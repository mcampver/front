import { FormControl } from '@angular/forms';

export interface ICreateFormPeople {
  name: FormControl<string | null>;
  position: FormControl<string | null>;
}
