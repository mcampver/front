import { inject } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';

import { DialogBasicComponent } from '@core/components/dialog-basic/dialog-basic.component';
import { SnackBarService } from '@core/components/snack-bar/snack-bar.service';
import { DataGridComponent } from '@shared/components/data-grid/component/data-grid.component';
import { CreateDialogData } from '@shared/interfaces';
import { IClasEq } from '@feature/components/clas-eq/interface/clas-eq.interface';
import { IDeleteResourceService } from '@shared/interfaces/delete-resource-service.interface';
import { SnackBarMessageEnum } from '@shared/enums/snack-bar-message.enum copy';
import { WidthDialogEnum } from '@shared/enums/dialog.enum';

export abstract class ClassifierListClass {
  protected snackBarService: SnackBarService = inject(SnackBarService);
  protected dialog: MatDialog = inject(MatDialog);

  abstract tabla?: DataGridComponent<IClasEq>;
  abstract createComponent: ComponentType<unknown>;
  abstract editComponent: ComponentType<unknown>;
  abstract service: IDeleteResourceService;

  get dataSelectId(): string[] {
    return this.tabla?.selection.selected ?? [];
  }

  get hasDataSelected(): boolean {
    return this.tabla?.selection.hasValue() ?? false;
  }

  add(): void {
    this.openDialog(this.createComponent);
  }

  edit(id: string): void {
    console.log(id);
    this.openDialog(this.editComponent, id);
  }

  openDialog(component: ComponentType<unknown>, id?: string): void {
    console.log(id);
    this.dialog
      .open(component, {
        disableClose: true,
        width: WidthDialogEnum.STANDARD,
        data: new CreateDialogData(id),
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        result && this.tableReload();
      });
  }

  deleteMany() {
    if (!this.hasDataSelected) return;
    const ids = this.dataSelectId;
    this.dialog
      .open(DialogBasicComponent, {
        data: {
          value: ids.length,
        },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.service.remove(ids).subscribe({
            next: () => {
              this.fullUpdateTable();
            },
            error: () => {
              this.snackBarService.openSnackBar(
                SnackBarMessageEnum.DELETE_ERROR,
                'error'
              );
            },
          });
        }
      });
  }

  tableReload(): void {
    this.tabla?.reloadData();
  }

  fullUpdateTable(): void {
    this.tabla?.selection.clear();
    this.tableReload();
  }
}
