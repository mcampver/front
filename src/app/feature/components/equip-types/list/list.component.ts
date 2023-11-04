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
import { IEquipTypes } from '../interfaces/equip-types.interface';
import { EquipTypesService } from '../equip-types.service';
import { CreateComponent } from '../create/create.component';
import { GlobalFormInputsMessage } from '@shared/enums/globals-form-messages.enum';

@Component({
  selector: 'ai-list-equipment',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  // @Output() emitter = new EventEmitter<Array<unknown>>();
  // @Input() hideOptions = false;
  @ViewChild('tabla')
  tabla!: DataGridComponent<IEquipTypes>;

  data: IEquipTypes[] = [];

  constructor(
    public service: EquipTypesService,
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
        console.log(result);
      });
  }

  edit(row: any): void {
    console.log('fila a editar', row);
    this.dialog
      .open(CreateComponent, {
        disableClose: true,
        width: '800px',
        data: { createType: CrudDialogTypeEnum.EDIT, obj: row },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        this.tabla.reloadData();
        console.log(result);
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
            this.service.deleteEquipType(ids).subscribe(() => {
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
