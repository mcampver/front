import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputNumber]',
})
export class InputNumberDirective {
  @Input() floatNumber = false;
  externalKeys = [
    'Backspace',
    'Tab',
    'ArrowDown',
    'ArrowUp',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
  ];

  cantOfPoint = 0;
  keyLock = 0;

  private _ultimateKey = '';

  @HostListener('keydown', ['$event'])
  keyDownShiftN(event: KeyboardEvent): void {
    if (
      this.isCopyOrPaste(event) ||
      this.isExternalKey(event.key) ||
      /^[0-9]\d*$/.test(event.key)
    ) {
      this._ultimateKey = event.key;
    } else event.preventDefault();
  }

  @HostListener('paste', ['$event'])
  pasteEvent(event: ClipboardEvent): void {
    if (!/^[0-9]\d*$/.test(event.clipboardData?.getData('text') ?? '')) {
      event.preventDefault();
    }
  }

  isCopyOrPaste(event: KeyboardEvent) {
    return (
      ((event.ctrlKey || event.metaKey) && event.key == 'c') ||
      ((event.ctrlKey || event.metaKey) && event.key == 'x') ||
      ((event.ctrlKey || event.metaKey) && event.key == 'v')
    );
  }

  isExternalKey(key: string): boolean {
    return this.externalKeys.some((exKey) => exKey === key);
  }

  isPointInvalid(key: string, value: string): boolean {
    if (key === '.' && this.floatNumber && this._ultimateKey !== '.') {
      return value.includes('.');
    }
    return true;
  }
}
