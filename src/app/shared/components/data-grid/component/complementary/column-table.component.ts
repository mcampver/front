import { Component, Input } from '@angular/core';
import { TFilter } from '../type/filter.type';
import { MatColumnDef } from '@angular/material/table';

@Component({
  selector: 'ai-mat-column-table',
  template: ``,
  styleUrls: ['../data-grid.component.scss'],
})
export class MatColumnTableComponent {
  @Input() title = 'Titulo Vacío';
  @Input() type: 'number' | 'string' | 'date' = 'string';
  @Input() arrowPosition: 'before' | 'after' = 'after';
  @Input() sort = false;
  @Input() filter = true;
  @Input() defaultFilter: TFilter = 'CONTAINS';
  @Input() hidden = false;

  @Input() width: string | undefined;
  @Input() minWidth: string | undefined;

  constructor(public matColumnDef: MatColumnDef) {}
}
