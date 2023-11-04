import { NgModule } from '@angular/core';
import { InputNumberDirective } from './input-number.directive';
import { InputAcronymDirective } from './input-acronym.directive';
import { InputOnlyLettersWithSpaceDirective } from './input-only-letters.directivev2';
import { InputNoEmojiDirective } from './input-no-emoji.directive';

const directives = [
  InputNumberDirective,
  InputAcronymDirective,
  InputOnlyLettersWithSpaceDirective,
  InputNoEmojiDirective,
];

@NgModule({
  declarations: directives,
  exports: directives,
})
export class AiDirectiveModule {}
