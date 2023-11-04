import { FormControl } from '@angular/forms';

export interface ICreateFormEquipTypes {
  name: FormControl<string | null>;
  code: FormControl<string | null>;
  initials: FormControl<string | null>;
  equipmentGroup: FormControl<string | null>;
}
