import { FormControl } from '@angular/forms';

export interface ICreateFormTypesMotor {
  name: FormControl<string | null>;
  initials: FormControl<string | null>;
}
