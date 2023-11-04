import { FormControl } from '@angular/forms';

export interface ICreateFormTechStates {
  name: FormControl<string | null>;
  initials: FormControl<string | null>;
}
