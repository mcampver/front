import { NgModule } from '@angular/core';
import { InputNumberDirective } from './input-number.directive';
import { InputOnlyLettersDirective } from './input-only-letters.directive';
import { InputOnlyLettersWithSpaceDirective } from './input-only-letters-with-space.directive';

const directives = [
  InputNumberDirective,
  InputOnlyLettersDirective,
  InputOnlyLettersWithSpaceDirective,
];

@NgModule({
  declarations: directives,
  exports: directives,
})
export class AiDirectiveModule {}
