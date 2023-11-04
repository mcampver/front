import { Component } from '@angular/core';
import { MatColumnDef } from '@angular/material/table';

@Component({
  selector: 'ai-mat-select-footer-cell',
  template: ``,
})
export class MatSelectFooterCellComponent {
  constructor(public matColumnDef: MatColumnDef) {
    matColumnDef.name = 'select';
  }
}
