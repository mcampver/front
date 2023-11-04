import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { MachineryTypeService } from '../machinery-type.service';

import { AiValidators } from '@shared/validators/ai-validators.class';
import { CreateDialogData } from '@shared/interfaces/create-dialog-data.interface';
import { TitleComponent } from '@shared/components/title/title.component';
import { getLabelCreateDialog } from '@shared/constants/create-dialog.constant';
import { CrudDialogTypeEnum } from '@shared/enums/dialog.enum';
import { FormMaxLengthEnum } from '@shared/enums/form-max-length.enum';
import { MatSelectModule } from '@angular/material/select';
import { GlobalFormInputsMessage } from '@shared/enums/globals-form-messages.enum';
import { SnackBarService } from '@core/components/snack-bar/snack-bar.service';
import { AiDirectiveModule } from '@shared/directives/ai-directive.module';
import { FormValidationErrorNameEnum } from '@shared/enums/form-validation-error-name.enum';
import {
  createDialogIdFn,
  createFindOneResourceFnMachineryTypes,
} from '@shared/functions';
import { ICreateFormMachineryTypes } from '@shared/interfaces/create-form-machinery-types.interface';
import { IBrand } from '@feature/components/brands/interfaces/brands.interface';

@Component({
  selector: 'ai-technical-committees-modal',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  providers: [MachineryTypeService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    FlexModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    DragDropModule,
    TitleComponent,
    MatSelectModule,
    AiDirectiveModule,
  ],
})
export class CreateComponent {
  createForm = new FormGroup<ICreateFormMachineryTypes>({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
      asyncValidators: [
        AiValidators.uniqFieldAsyncValidator(
          'name',
          createFindOneResourceFnMachineryTypes(MachineryTypeService),
          createDialogIdFn()
        ),
      ],
    }),
  });

  // Mensajes para los inputs
  globalFormInputsMessage = GlobalFormInputsMessage;
  formValidationErrorNameEnum = FormValidationErrorNameEnum;

  myBrands: IBrand[] = [];

  selectData = new FormControl<string>('', {
    validators: [Validators.required],
  });

  constructor(
    private service: MachineryTypeService,
    public dialogRef: MatDialogRef<CreateComponent>,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA)
    public data: CreateDialogData
  ) {
    if (this.data.createType === 1) {
      console.log('Este es el modelo a editar:', this.data.obj);
      this.createForm.setValue({
        name: this.data.obj.name,
      });
    }
  }

  get name() {
    return this.createForm.value.name;
  }

  get labelTitle(): string {
    return getLabelCreateDialog(
      this.data?.createType ? this.data.createType : CrudDialogTypeEnum.CREATE
    );
  }

  get labelCreate(): string {
    return getLabelCreateDialog(CrudDialogTypeEnum.CREATE);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  accept(): void {
    this.dialogRef.close(false);
    if (this.data.createType === 0) {
      console.log('este es el crear', this.createForm.value);
      this.service
        .createMachineryType({
          name: this.createForm.controls['name'].value!,
        })
        .subscribe({
          next: () => {
            this.snackBarService?.openSnackBar(
              GlobalFormInputsMessage.CREATE_SUCCESSFUL
            );
            this.dialogRef.close(false);
          },
          error: () => {
            console.log('Entro aqui???');
            this.snackBarService?.openSnackBar(
              GlobalFormInputsMessage.CREATE_ERROR,
              'error'
            );
          },
        });
    } else {
      this.service
        .updateMachineryType({
          id: this.data.obj.id,
          name: this.createForm.controls['name'].value!,
        })
        .subscribe({
          next: () => {
            this.snackBarService?.openSnackBar(
              GlobalFormInputsMessage.CREATE_SUCCESSFUL
            );
            this.dialogRef.close(false);
          },
          error: () => {
            console.log('Entro aqui???');
            this.snackBarService?.openSnackBar(
              GlobalFormInputsMessage.CREATE_ERROR,
              'error'
            );
          },
        });
    }
  }
}
