import { Component, Input } from '@angular/core';
import { MatColumnDef } from '@angular/material/table';

@Component({
  selector: 'ai-mat-option-table',
  template: ``,
  styleUrls: ['../data-grid.component.scss'],
})
export class MatOptionTableComponent {
  @Input() title = '';

  constructor(public matColumnDef: MatColumnDef) {
    matColumnDef.name = 'option';
  }
}
