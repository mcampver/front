import { inject } from '@angular/core';
import { ModalPresenter } from '../modal/modal.presenter';
import { getLabelCreateDialog } from '@shared/constants/create-dialog.constant';
import { CrudDialogTypeEnum } from '@shared/enums/dialog.enum';
import { ClasEqService } from '../clas-eq.service';
import { SnackBarService } from '@core/components/snack-bar/snack-bar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateDialogData } from '@shared/interfaces';

export abstract class ModalComponent<T> {
  codC = '0';
  codE = '0';
  codM = '0';
  codG = this.codC + this.codE + this.codM;

  public readonly formPresenter: ModalPresenter = inject(ModalPresenter);
  show = this.formPresenter.controls['equipmentType'].value.name;
  code = this.formPresenter.controls['code'].setValue(this.codG);
  protected readonly service: ClasEqService = inject(ClasEqService);
  protected readonly snackBarService: SnackBarService = inject(SnackBarService);
  protected readonly dialogRef: MatDialogRef<T> = inject(MatDialogRef<T>);
  protected readonly data: CreateDialogData =
    inject<CreateDialogData>(MAT_DIALOG_DATA);

  abstract readonly type: CrudDialogTypeEnum;
  get labelTitle(): string {
    return getLabelCreateDialog(this.type);
  }

  codeEquipmentType(): void {
    const obj: any = this.formPresenter.controls['equipmentType'].value;
    this.codE = obj.code;
  }

  codeCountry(): void {
    const obj: any = this.formPresenter.controls['country'].value;
    this.codC = obj.code;
  }

  codeModel(): void {
    const obj: any = this.formPresenter.controls['model'].value;
    this.codM = obj.code;
  }

  accept(): void {
    // if (!this.formPresenter.valid) return;
    this.submit();
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  protected abstract submit(): void;
}
