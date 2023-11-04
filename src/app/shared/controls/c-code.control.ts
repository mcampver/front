import { FormControl, Validators } from '@angular/forms';
import { ClasEqService } from '@feature/components/clas-eq/clas-eq.service';
import { FormMaxLengthEnum } from '@shared/enums/form-max-length.enum';
import { createDialogIdFn } from '@shared/functions';
import { createFindOneResourceFn } from '@shared/functions/create-inject.function';
import { AiValidators } from '@shared/validators/ai-validators.class';

export class CCodeControl extends FormControl {
  constructor() {
    super('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_SIZE),
      ],
      asyncValidators: [
        AiValidators.uniqFieldAsyncValidator(
          'code',
          createFindOneResourceFn(ClasEqService),
          createDialogIdFn()
        ),
      ],
      nonNullable: true,
    });
  }
}
