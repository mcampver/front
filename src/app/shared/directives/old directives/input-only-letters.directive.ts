import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputOnlyLetters]',
})
export class InputOnlyLettersDirective {
  @Input() noBackSpace = false;

  externalKeys = [
    'Backspace',
    'Tab',
    'ArrowDown',
    'ArrowUp',
    'ArrowLeft',
    'ArrowRight',
  ];

  @HostListener('keydown', ['$event'])
  keyDownShiftN(event: KeyboardEvent): void {
    if (!this.isExternalKey(event.key) && !this.isLetter(event.keyCode)) {
      if (!this.noBackSpace && event.key === ' ') {
        event.preventDefault();
      }
      event.preventDefault();
    }
  }

  isLetter(key: number): boolean {
    return key <= 64 || key >= 91 ? false : true;
  }

  isExternalKey(key: string): boolean {
    return this.externalKeys.some((exKey) => exKey === key);
  }
}
