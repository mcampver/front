import { Directive, HostListener, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputOnlyLettersWithSpace]',
})
export class InputOnlyLettersWithSpaceDirective {
  constructor(@Optional() private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  acronym(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    this.ngControl.control?.setValue(
      eventTarget.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, '')
    );
  }
}
