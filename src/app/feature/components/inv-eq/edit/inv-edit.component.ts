// @Autor:Gianni Martinez
import { Component, Inject } from '@angular/core';
import { CreateDialogData } from '@shared/interfaces/create-dialog-data.interface';
import { FormMaxLengthEnum } from '@shared/enums/form-max-length.enum';
import { AiValidators } from '@shared/validators/ai-validators.class';
import { getLabelCreateDialog } from '@shared/constants/create-dialog.constant';
import { CrudDialogTypeEnum } from '@shared/enums/dialog.enum';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TitleComponent } from '@shared/components/title/title.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ICreateFormInvEq } from '@shared/interfaces/create-form- inv-eq';
import { InvEqService } from '../inv-eq.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { DataGridModule } from '@shared/components/data-grid/data-grid.module';
import { GlobalFormInputsMessage } from '@shared/enums/globals-form-messages.enum';
import { FormValidationErrorNameEnum } from '@shared/enums/form-validation-error-name.enum';

@Component({
  selector: 'ai-inv-eq',
  templateUrl: './inv-edit.component.html',
  styleUrls: ['./inv-edit.component.scss'],
  standalone: true,
  providers: [InvEqService],
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
    MatStepperModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    DataGridModule,
    MatButtonModule,
  ],
})
export class InvEditComponent {
  createForm = new FormGroup<ICreateFormInvEq>({
    id: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
    }),
    registration: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
    }),
    typeEq: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
    }),
    trademark: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
    }),
    model: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
    }),
    serial: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
    }),
    actualSit: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
    }),
    state: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
    }),
    entity: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
    }),
  });

  constructor(
    private service: InvEqService,
    public dialogRef: MatDialogRef<ICreateFormInvEq>,
    @Inject(MAT_DIALOG_DATA)
    public data: CreateDialogData
  ) {
    console.log('Esta es la data:', data);
  }

  get id() {
    return this.createForm.value.id;
  }

  get registration() {
    return this.createForm.value.registration;
  }

  get typeEq() {
    return this.createForm.value.typeEq;
  }

  get trademark() {
    return this.createForm.value.trademark;
  }

  get model() {
    return this.createForm.value.model;
  }

  get serial() {
    return this.createForm.value.serial;
  }

  get actualSit() {
    return this.createForm.value.actualSit;
  }

  get state() {
    return this.createForm.value.state;
  }

  get entity() {
    return this.createForm.value.entity;
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
    //Todo: Hacer aquí la llamada a crear
    this.dialogRef.close(false);
  }
}
