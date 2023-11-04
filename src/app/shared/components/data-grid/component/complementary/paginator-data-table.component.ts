import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'ai-mat-paginator-data-table',
  template: ``,
  styleUrls: ['../data-grid.component.scss'],
})
export class MatPaginatorDataTableComponent {
  @Input() pageSizeOptions = [10, 25, 100];
  @Input() color: ThemePalette;
  @Input() colorProgressBar: ThemePalette;
  @Input() showFirstLastButtons = true;
  @Input() hidePageSize = false;
  @Input() disabled = false;
}
