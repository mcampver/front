import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { FormMaxLengthEnum } from '@shared/enums/form-max-length.enum';
import { ICreateFormPlanillaInv } from '@shared/interfaces/create-form-inv-eq-planilla';
import { AiValidators } from '@shared/validators/ai-validators.class';
import { InvEqService } from '../inv-eq.service';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CreateDialogData } from '@shared/interfaces';
import { getLabelCreateDialog } from '@shared/constants/create-dialog.constant';
import { CrudDialogTypeEnum } from '@shared/enums/dialog.enum';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TitleComponent } from '@shared/components/title/title.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'ai-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.scss'],
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
    MatRadioModule,
    MatCheckboxModule,
  ],
})
export class PlanillaComponent {
  createForm = new FormGroup<ICreateFormPlanillaInv>({
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
    public dialogRef: MatDialogRef<ICreateFormPlanillaInv>,
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
