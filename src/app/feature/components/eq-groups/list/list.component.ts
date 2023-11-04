// @Autor:Javier Aleaga
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { DataGridComponent } from 'src/app/shared/components/data-grid/component/data-grid.component';
import { DialogBasicComponent } from 'src/app/core/components/dialog-basic/dialog-basic.component';
import { SnackBarService } from 'src/app/core/components/snack-bar/snack-bar.service';
import { CrudDialogTypeEnum } from '@shared/enums/dialog.enum';
import { IEqGroups } from '../interfaces/eq-groups.interface';
import { EqGroupsService } from '../eq-groups.service';
import { CreateComponent } from '../create/create.component';
import { GlobalFormInputsMessage } from '@shared/enums/globals-form-messages.enum';

@Component({
  selector: 'ai-list-equipment',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @ViewChild('tabla')
  tabla!: DataGridComponent<IEqGroups>;

  data: IEqGroups[] = [];

  constructor(
    public service: EqGroupsService,
    private router: Router,
    private snackBarService: SnackBarService,
    public dialog: MatDialog
  ) {}

  get dataSelectId(): string[] {
    return this.tabla?.selection.selected ?? [];
  }

  get hasDataSelected(): boolean {
    return this.tabla?.selection.hasValue() ?? false;
  }

  add(): void {
    this.dialog
      .open(CreateComponent, {
        disableClose: true,
        width: '800px',
        data: {
          createType: CrudDialogTypeEnum.CREATE,
        },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        this.tabla.reloadData();
      });
  }

  edit(row: any): void {
    this.dialog
      .open(CreateComponent, {
        disableClose: true,
        width: '800px',
        data: { createType: CrudDialogTypeEnum.EDIT, obj: row },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        this.tabla.reloadData();
      });
  }

  deleteMany() {
    const ids = this.tabla.selection.selected;
    this.dialog
      .open(DialogBasicComponent, {
        data: {
          value: 1,
        },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          if (result) {
            this.service.deleteEqGroups(ids).subscribe(() => {
              this.tabla.reloadData();
              this.tabla.selection.clear();
              this.snackBarService?.openSnackBar(
                GlobalFormInputsMessage.DELETE_SUCCESSFUL
              );
            });
          }
        }
      });
  }
}
