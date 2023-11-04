// @Autor:Gianni Martinez
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { DataGridComponent } from 'src/app/shared/components/data-grid/component/data-grid.component';
import { DialogBasicComponent } from 'src/app/core/components/dialog-basic/dialog-basic.component';
import { SnackBarService } from 'src/app/core/components/snack-bar/snack-bar.service';
import { CrudDialogTypeEnum } from '@shared/enums/dialog.enum';
import { IInvEq } from '../interface/inv-eq.interface';
import { InvEqService } from '../inv-eq.service';
import { InvEqComponent } from '../create/inv-eq.component';
import { UnsubscribeComponent } from '@feature/components/inv-eq/unsubscribe/unsubscribe.component';
import { PlanillaComponent } from '../planilla/planilla.component';
import { DepreciationComponent } from '../depreciation/depreciation.component';
import { InvEditComponent } from '../edit/inv-edit.component';

@Component({
  selector: 'ai-list-equipment',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  // @Output() emitter = new EventEmitter<Array<unknown>>();
  // @Input() hideOptions = false;
  @ViewChild('tabla')
  tabla!: DataGridComponent<IInvEq>;

  data: IInvEq[] = [];

  constructor(
    public service: InvEqService,
    private router: Router,
    private snackBarService: SnackBarService,
    public dialog: MatDialog
  ) {}

  // @Output()
  // emitSelectedValues(event: Array<unknown>) {
  //   this.emitter.emit(event);
  // }
  get dataSelectId(): string[] {
    return this.tabla?.selection.selected ?? [];
  }

  get hasDataSelected(): boolean {
    return this.tabla?.selection.hasValue() ?? false;
  }

  add(): void {
    console.log('openDialog button');
    this.dialog
      .open(InvEqComponent, {
        disableClose: true,
        width: '800px',
        // height: '1500px',
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        console.log(result);
      });
  }

  darBaja(): void {
    console.log('openDialog button');
    this.dialog
      .open(UnsubscribeComponent, {
        disableClose: true,
        width: '800px',
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        console.log(result);
      });
  }

  edit(id: string): void {
    console.log(id);
    this.dialog
      .open(InvEditComponent, {
        disableClose: true,
        width: '800px',
        data: { createType: CrudDialogTypeEnum.EDIT },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        console.log(result);
      });
  }

  deleteMany() {
    this.dialog
      .open(DialogBasicComponent, {
        data: {
          value: 1,
        },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          // this.snackBarService?.openSnackBar('Test Messange', 'Cerrar');
        }
      });
  }

  planilla(): void {
    console.log('openDialog button');
    this.dialog
      .open(PlanillaComponent, {
        disableClose: true,
        width: '2000px',
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        console.log(result);
      });
  }

  depreciation(): void {
    console.log('openDialog button');
    this.dialog
      .open(DepreciationComponent, {
        disableClose: true,
        width: '800px',
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        console.log(result);
      });
  }
}
