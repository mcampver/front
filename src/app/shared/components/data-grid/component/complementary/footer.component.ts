import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewChild,
} from '@angular/core';
import { MatFooterRowDef } from '@angular/material/table';
import { MatFooterCellComponent } from './footer-cell.component';

@Component({
  selector: 'ai-mat-footer',
  template: ` <tr
    [ngStyle]="{ display: !hide ? '' : 'none' }"
    mat-footer-row
    *matFooterRowDef="nameColumnString"
  ></tr>`,
})
export class MatFooterComponent implements AfterContentInit {
  @Input() hide = false;
  @ViewChild(MatFooterRowDef) matFooterRowDef?: MatFooterRowDef;
  @ContentChildren(MatFooterCellComponent)
  footerCells?: QueryList<MatFooterCellComponent>;

  nameColumnString: string[];

  constructor() {
    this.nameColumnString = [];
  }

  ngAfterContentInit(): void {
    this.footerCells?.forEach((footerCell) => {
      this.nameColumnString.push(footerCell.matColumnDef.name);
    });
  }
}
