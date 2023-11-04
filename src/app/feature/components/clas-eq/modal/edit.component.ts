import { Component, OnInit } from '@angular/core';

import { CrudDialogTypeEnum } from '@shared/enums/dialog.enum';

import { MODAL_DEPENDENCIES } from './modal.dependencis';
import { ModalComponent } from '../class/modal.class';
import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { AllowedOperation } from '@shared/components/data-grid/component/enum/paginate-operator.enum';
import { IClasEq } from '../interface/clas-eq.interface';
import { SnackBarMessageEnum } from '@shared/enums/snack-bar-message.enum copy';

@Component({
  selector: 'ai-classifier-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  providers: MODAL_DEPENDENCIES.providers,
  imports: MODAL_DEPENDENCIES.imports,
})
// implements OnInit
export class EditComponent
  extends ModalComponent<EditComponent>
  implements OnInit
{
  readonly type: CrudDialogTypeEnum = CrudDialogTypeEnum.EDIT;

  page: IPaginateDTO = {
    take: 1,
    select: [
      { key: 'classifier.equipmentType', alias: 'equipmentTyoe' },
      { key: 'classifier.machineryType', alias: 'machineryType' },
      { key: 'classifier.country', alias: 'country' },
      { key: 'classifier.brand', alias: 'brand' },
      { key: 'classifier.model', alias: 'model' },
    ],
    orSearchFields: [
      {
        field: 'classifier.id',
        operation: 'EQUALS' as AllowedOperation,
        values: [this.id],
      },
    ],
  };

  get id(): string {
    return this.data.id ?? '';
  }

  ngOnInit(): void {
    this.chargeData();
  }

  chargeData(): Promise<void> {
    return new Promise((resolve) => {
      this.formPresenter.disable();
      this.service.findOneResource(this.page).subscribe((data) => {
        if (data) {
          const newData: IClasEq = {
            id: data.id,
            code: data.code,
            country: data.country,
            equipmentType: data.equipmentType,
            machineryType: data.machineryType,
            brand: data.brand,
            model: data.model,
            serial: data.serial,
            tuition: data.tuition,
            c32: data.c32,
            rutePaper: data.rutePaper,
            simpleRutePaper: data.simpleRutePaper,
          };
          this.formPresenter.fillData(newData);

          this.formPresenter.enable();
        }
      });
      resolve();
    });
  }

  protected submit(): void {
    this.service
      .edit({ id: this.id, ...this.formPresenter.classifierDataForm })
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: () => {
          this.snackBarService.openSnackBar(
            SnackBarMessageEnum.UPDATE_ERROR,
            'error'
          );
        },
      });
  }
}
