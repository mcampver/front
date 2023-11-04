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

import { EquipTypesService } from '../equip-types.service';

import { AiValidators } from '@shared/validators/ai-validators.class';
import { CreateDialogData } from '@shared/interfaces/create-dialog-data.interface';
import { ICreateFormEquipTypes } from '@shared/interfaces/create-form-equip-types.interface';
import { TitleComponent } from '@shared/components/title/title.component';
import { getLabelCreateDialog } from '@shared/constants/create-dialog.constant';
import { CrudDialogTypeEnum } from '@shared/enums/dialog.enum';
import { FormMaxLengthEnum } from '@shared/enums/form-max-length.enum';
import { MatSelectModule } from '@angular/material/select';
import { GlobalFormInputsMessage } from '@shared/enums/globals-form-messages.enum';
import { IEqGroups } from '@feature/components/eq-groups/interfaces/eq-groups.interface';
import { SnackBarService } from '@core/components/snack-bar/snack-bar.service';
import { AiDirectiveModule } from '@shared/directives/ai-directive.module';
import { FormValidationErrorNameEnum } from '@shared/enums/form-validation-error-name.enum';
import {
  createDialogIdFn,
  createFindOneResourceFnEquipTypes,
} from '@shared/functions';
import { EqGroupsService } from '@feature/components/eq-groups/eq-groups.service';

@Component({
  selector: 'ai-technical-committees-modal',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  providers: [EquipTypesService, EqGroupsService],
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
  createForm = new FormGroup<ICreateFormEquipTypes>({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
      asyncValidators: [
        AiValidators.uniqFieldAsyncValidator(
          'name',
          createFindOneResourceFnEquipTypes(EquipTypesService),
          createDialogIdFn()
        ),
      ],
    }),
    code: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.SMALL_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
      asyncValidators: [
        AiValidators.uniqFieldAsyncValidator(
          'code',
          createFindOneResourceFnEquipTypes(EquipTypesService),
          createDialogIdFn()
        ),
      ],
    }),
    initials: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.SMALL_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
    }),
    equipmentGroup: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  // Mensajes para los inputs
  globalFormInputsMessage = GlobalFormInputsMessage;
  formValidationErrorNameEnum = FormValidationErrorNameEnum;

  myEquipsGroups: IEqGroups[] = [];

  selectData = new FormControl<string>('', {
    validators: [Validators.required],
  });

  constructor(
    private service: EquipTypesService,
    public dialogRef: MatDialogRef<CreateComponent>,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA)
    public data: CreateDialogData,
    public equipGroupService: EqGroupsService
  ) {
    this.equipGroupService
      .getEqGroups({
        skip: 0,
        take: -1,
      })
      .subscribe((data) => (this.myEquipsGroups = data.items));
    if (this.data.createType === 1) {
      const idEquipGroup: string = this.data.obj.equipmentGroup.id;
      this.createForm.setValue({
        name: this.data.obj.name,
        equipmentGroup: this.data.obj.equipmentGroup.id,
        code: this.data.obj.code,
        initials: this.data.obj.initials,
      });
      this.selectData.setValue(idEquipGroup);
    }
  }

  get name() {
    return this.createForm.value.name;
  }

  get code() {
    return this.createForm.value.code;
  }

  get initials() {
    return this.createForm.value.initials;
  }

  get equipmentGroup() {
    return this.createForm.value.equipmentGroup;
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
    if (this.data.createType === 0) {
      this.service
        .createEquipType({
          name: this.createForm.controls['name'].value!,
          equipmentGroup: this.selectData.value ?? '',
          code: this.createForm.controls['code'].value!,
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
        .updateEquipType({
          id: this.data.obj.id,
          name: this.createForm.controls['name'].value!,
          equipmentGroup: this.selectData.value ?? '',
          code: this.createForm.controls['code'].value!,
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
    }
  }

  loadFormControl(): void {
    this.createForm.controls['equipmentGroup'].setValue(
      this.selectData.value ?? ''
    );
  }
}
