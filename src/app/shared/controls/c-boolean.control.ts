import { FormControl, Validators } from '@angular/forms';

export class CBooleanControl extends FormControl {
  constructor() {
    super(false, {
      validators: [Validators.required],
      nonNullable: true,
    });
  }
}
