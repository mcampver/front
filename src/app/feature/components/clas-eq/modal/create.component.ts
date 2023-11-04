import { Component, OnInit } from '@angular/core';
import { CrudDialogTypeEnum } from '@shared/enums/dialog.enum';
import { MODAL_DEPENDENCIES } from './modal.dependencis';
import { ModalComponent } from '../class/modal.class';
import { SnackBarMessageEnum } from '@shared/enums/snack-bar-message.enum copy';
import { ClassifierCreateDto } from '../class/classifier-create.dto.class';

@Component({
  selector: 'ai-classifier-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  providers: MODAL_DEPENDENCIES.providers,
  imports: MODAL_DEPENDENCIES.imports,
})
// implements OnInit
export class CreateComponent extends ModalComponent<CreateComponent> {
  readonly type: CrudDialogTypeEnum = CrudDialogTypeEnum.CREATE;
  d: any;

  // ngOnInit(): void {
  //   this.
  // }

  protected submit(): void {
    let create: ClassifierCreateDto = new ClassifierCreateDto();

    create = {
      ...this.formPresenter.classifierDataForm,
      country: (this.formPresenter.classifierDataForm.country as any)['id'],
      equipmentType: (
        this.formPresenter.classifierDataForm.equipmentType as any
      )['id'],
      machineryType: (
        this.formPresenter.classifierDataForm.machineryType as any
      )['id'],
      brand: (this.formPresenter.classifierDataForm.brand as any)['id'],
      model: (this.formPresenter.classifierDataForm.model as any)['id'],
    };

    console.table(create);

    this.service.create(create).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBarService.openSnackBar(
          SnackBarMessageEnum.CREATE_ERROR,
          'error'
        );
      },
    });
  }
}
