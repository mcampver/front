import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { AllowedOperation } from '@shared/components/data-grid/component/enum/paginate-operator.enum';

export class AiValidators {
  static noInitialSpaceValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return (control.value as string).trim().length === 0
      ? { noInitWhiteSpace: { value: control.value } }
      : null;
  };

  static isObjectValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value && typeof control.value !== 'object'
      ? { isObject: { value: control.value } }
      : null;
  };

  static valueUnderZeroValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value && (control.value as number) < 0
      ? { valueUnderZero: { value: control.value } }
      : null;
  };

  static isNumberValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value && !isNaN(+control.value)
      ? { isNumberValidator: { value: control.value } }
      : null;
  };

  static isStringValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value && isNaN(+control.value)
      ? { isStringValidator: { value: control.value } }
      : null;
  };

  static fourDigitValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const array: string[] = control.value.split('.') ?? '';
    return control.value && array.length > 1 && array[1].length > 4
      ? { fourDigitValidator: { value: control.value } }
      : null;
  };

  static uniqFieldAsyncValidator(
    field: string,
    searchFn: (input: IPaginateDTO) => Observable<unknown>,
    dialogIdFn: () => string | undefined
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const searchFields = [
        {
          field: field,
          values: [(control.value as string).trim()],
          operation: 'EQUALS_IGNORE_CASE' as AllowedOperation,
        },
      ];
      const id = dialogIdFn();
      if (id)
        searchFields.push({
          field: 'id',
          values: [id],
          operation: 'distint' as AllowedOperation,
        });
      return searchFn({
        searchFields,
      }).pipe(
        map((data) => {
          return data ? { fieldExist: true } : null;
        }),
        catchError(() => of(null))
      );
    };
  }
}
