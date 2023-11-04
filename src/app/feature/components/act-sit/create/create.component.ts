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

import { ActSitService } from '../act-sit.service';

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
  createFindOneResourceFnActSit,
} from '@shared/functions';
import { ICreateFormTypesMotor } from '@shared/interfaces/create-form-types-motor.interface';

@Component({
  selector: 'ai-technical-committees-modal',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  providers: [ActSitService],
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
  createForm = new FormGroup<ICreateFormTypesMotor>({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.LARGE_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
      asyncValidators: [
        AiValidators.uniqFieldAsyncValidator(
          'name',
          createFindOneResourceFnActSit(ActSitService),
          createDialogIdFn()
        ),
      ],
    }),
    initials: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_MIN_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
    }),
  });

  // Mensajes para los inputs
  globalFormInputsMessage = GlobalFormInputsMessage;
  formValidationErrorNameEnum = FormValidationErrorNameEnum;
  inputRequeried = GlobalFormInputsMessage.INPUT_REQUIERED;
  nameMsg = GlobalFormInputsMessage.INPUT_BRAND;

  constructor(
    private service: ActSitService,
    public dialogRef: MatDialogRef<CreateComponent>,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA)
    public data: CreateDialogData
  ) {
    if (this.data.createType === 1) {
      this.createForm.setValue({
        name: this.data.obj.name,
        initials: this.data.obj.initials,
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
      this.service
        .createCurrentSituation({
          name: this.createForm.controls['name'].value!,
          initials: this.createForm.controls['initials'].value!.toUpperCase(),
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
        .updateCurrentSituation({
          id: this.data.obj.id,
          name: this.createForm.controls['name'].value!,
          initials: this.createForm.controls['initials'].value!,
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
