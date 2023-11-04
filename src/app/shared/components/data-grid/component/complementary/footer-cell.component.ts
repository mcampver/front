import { Component } from '@angular/core';
import { MatColumnDef } from '@angular/material/table';

@Component({
  selector: 'ai-mat-footer-cell',
  template: ``,
})
export class MatFooterCellComponent {
  constructor(public matColumnDef: MatColumnDef) {}
}
