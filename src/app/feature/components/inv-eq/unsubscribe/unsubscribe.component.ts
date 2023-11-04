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
import { MatRadioModule } from '@angular/material/radio';
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
import { MatDialog } from '@angular/material/dialog';

import { UnsubscribeUebComponent } from './unsubscribe-tranfer-ueb/unsubscribe-tranfer-ueb.component';
import { UnsubscribeSameOsdeComponent } from './unsubscribe-tranfer-same-osde/unsubscribe-tranfer-same-osde.component';
import { UnsubscribeTranferAnotherOsdeComponent } from './unsubscribe-tranfer-another-osde/unsubscribe-tranfer-another-osde.component';
import { UnsubscribeTranferExternalCompanyComponent } from './unsubscribe-tranfer-external-company/unsubscribe-tranfer-external-company.component';
import { UnsubscribeTecnComponent } from './unsubscribe-tecn/unsubscribe-tecn.component';

@Component({
  selector: 'ai-inv-eq-dbaja',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss'],
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
  ],
})
export class UnsubscribeComponent {
  selectTbaja?: string;

  tbajas: string[] = [
    'Baja técnica',
    'Traslado a empresa externa',
    'Traslado a otro Osde',
    'Traslado a empresa del mismo Osde',
    'Traslado a UEB de la misma empresa',
  ];

  constructor(
    private service: InvEqService,
    public dialogRef: MatDialogRef<ICreateFormInvEq>,
    @Inject(MAT_DIALOG_DATA)
    public data: CreateDialogData,
    public dialog: MatDialog
  ) {
    console.log('Esta es la data:', data);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  accept(selected: unknown): void {
    //Todo: Hacer aquí la llamada a crear
    this.dialogRef.close(false);

    if (selected == this.tbajas[0]) {
      this.dialog
        .open(UnsubscribeTecnComponent, {
          disableClose: true,
          width: '1200px',
        })
        .afterClosed()
        .subscribe((result: boolean) => {
          console.log(result);
        });
    }

    if (selected == this.tbajas[1]) {
      this.dialog
        .open(UnsubscribeTranferExternalCompanyComponent, {
          disableClose: true,
          width: '1200px',
        })
        .afterClosed()
        .subscribe((result: boolean) => {
          console.log(result);
        });
    }

    if (selected == this.tbajas[2]) {
      this.dialog
        .open(UnsubscribeTranferAnotherOsdeComponent, {
          disableClose: true,
          width: '1200px',
        })
        .afterClosed()
        .subscribe((result: boolean) => {
          console.log(result);
        });
    }

    if (selected == this.tbajas[3]) {
      this.dialog
        .open(UnsubscribeSameOsdeComponent, {
          disableClose: true,
          width: '1200px',
        })
        .afterClosed()
        .subscribe((result: boolean) => {
          console.log(result);
        });
    }

    if (selected == this.tbajas[4]) {
      this.dialog
        .open(UnsubscribeUebComponent, {
          disableClose: true,
          width: '1200px',
        })
        .afterClosed()
        .subscribe((result: boolean) => {
          console.log(result);
        });
    }
  }

  /* Hacer un metodo que valide que el nombre y las siglas solo contienen letras */
}
