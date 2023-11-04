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
import { InvEqService } from '../../inv-eq.service';
import { MatDialog } from '@angular/material/dialog';
import { UnsubscribeComponent } from '../unsubscribe.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { IInvEq } from '../../interface/inv-eq.interface';
import { publishFacade } from '@angular/compiler';
import { IPaginateDTO } from '@shared/components/data-grid/component/interface';
import { take } from 'rxjs';

@Component({
  selector: 'ai-inv-eq-dbaja-ueb',
  templateUrl: './unsubscribe-tranfer-ueb.component.html',
  styleUrls: ['./unsubscribe-tranfer-ueb.component.scss'],
  standalone: true,
  providers: [
    InvEqService,
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class UnsubscribeUebComponent {
  invData: IInvEq[] = [];

  page: IPaginateDTO = {
    take: 1,
  };

  bajaForm = new FormGroup<ICreateFormInvEq>({
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
    public data: CreateDialogData,
    public dialog: MatDialog
  ) {}

  get id() {
    return this.bajaForm.value.id;
  }

  get registration() {
    return this.bajaForm.value.registration;
  }

  get typeEq() {
    return this.bajaForm.value.typeEq;
  }

  get trademark() {
    return this.bajaForm.value.trademark;
  }

  get model() {
    return this.bajaForm.value.model;
  }

  get serial() {
    return this.bajaForm.value.serial;
  }

  get actualSit() {
    return this.bajaForm.value.actualSit;
  }

  get state() {
    return this.bajaForm.value.state;
  }

  get entity() {
    return this.bajaForm.value.entity;
  }

  ngOnInit(): void {
    this.chargeData();
  }

  chargeData(): void {
    this.bajaForm.disable();
    this.service.findAllPagination().subscribe((data) => {
      this.invData = data.items;
      if (this.invData) {
        this.bajaForm.patchValue(this.invData[0]);
        this.bajaForm.enable();
      }
      console.log(this.invData);
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
    this.dialog
      .open(UnsubscribeComponent, {
        disableClose: true,
        width: '800px',
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        console.log(result);
      });
  }

  accept(): void {
    //Todo: Hacer aquí la llamada a crear
    this.dialogRef.close(false);
  }

  /* Hacer un metodo que valide que el nombre y las siglas solo contienen letras */
}
