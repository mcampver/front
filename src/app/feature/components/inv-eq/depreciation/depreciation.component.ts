import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TitleComponent } from '@shared/components/title/title.component';
import { FormMaxLengthEnum } from '@shared/enums/form-max-length.enum';
import { AiValidators } from '@shared/validators/ai-validators.class';
import { InvEqService } from '../inv-eq.service';
import { CreateDialogData } from '@shared/interfaces';
import { getLabelCreateDialog } from '@shared/constants/create-dialog.constant';
import { CrudDialogTypeEnum } from '@shared/enums/dialog.enum';
import { ICreateFormDepreciation } from '@shared/interfaces/create-form-inv-eq-depreciation';

@Component({
  selector: 'ai-depreciation',
  templateUrl: './depreciation.component.html',
  styleUrls: ['./depreciation.component.scss'],
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
    MatSelectModule,
    MatFormFieldModule,
  ],
})
export class DepreciationComponent {
  createForm = new FormGroup<ICreateFormDepreciation>({
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
    public dialogRef: MatDialogRef<ICreateFormDepreciation>,
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
    this.dialogRef.close(false);
  }
}
