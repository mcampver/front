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

import { GestModelsService } from '../gest-models.service';

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
  createFindOneResourceFnGestModels,
} from '@shared/functions';
import { ICreateFormGestModels } from '@shared/interfaces/create-form-gest-models.interface';
import { IBrand } from '@feature/components/brands/interfaces/brands.interface';
import { BrandService } from '@feature/components/brands/brands.service';

@Component({
  selector: 'ai-technical-committees-modal',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  providers: [GestModelsService, BrandService],
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
  createForm = new FormGroup<ICreateFormGestModels>({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(FormMaxLengthEnum.MEDIUM_SIZE),
        AiValidators.noInitialSpaceValidator,
      ],
      asyncValidators: [
        AiValidators.uniqFieldAsyncValidator(
          'name',
          createFindOneResourceFnGestModels(GestModelsService),
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
          createFindOneResourceFnGestModels(GestModelsService),
          createDialogIdFn()
        ),
      ],
    }),
    brand: new FormControl('', {
      validators: [Validators.required],
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
    private service: GestModelsService,
    public dialogRef: MatDialogRef<CreateComponent>,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA)
    public data: CreateDialogData,
    public brandService: BrandService
  ) {
    brandService
      .getBrands({
        skip: 0,
        take: -1,
      })
      .subscribe((data) => (this.myBrands = data.items));
    if (this.data.createType === 1) {
      console.log('Este es el modelo a editar:', this.data.obj);
      const idModel: string = this.data.obj.brand.id;
      this.createForm.setValue({
        name: this.data.obj.name,
        brand: this.data.obj.brand.id,
        code: this.data.obj.code,
      });
      this.selectData.setValue(idModel);
    }
  }

  get name() {
    return this.createForm.value.name;
  }

  get code() {
    return this.createForm.value.code;
  }

  get brand() {
    return this.createForm.value.brand;
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
      console.log('este es el crear', this.createForm.value);
      this.service
        .createModels({
          name: this.createForm.controls['name'].value!,
          brand: this.selectData.value ?? '',
          code: this.createForm.controls['code'].value!,
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
        .updateModels({
          id: this.data.obj.id,
          name: this.createForm.controls['name'].value!,
          brand: this.selectData.value ?? '',
          code: this.createForm.controls['code'].value!,
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
    this.createForm.controls['brand'].setValue(this.selectData.value ?? '');
  }
}
