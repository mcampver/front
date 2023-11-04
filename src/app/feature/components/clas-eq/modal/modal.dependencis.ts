import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AutoCompleteModule } from '@shared/auto-complete/auto-complete.module';
import { TitleComponent } from '@shared/components/title/title.component';
import { ClasEqService } from '../clas-eq.service';
import { ModalPresenter } from './modal.presenter';

export const MODAL_DEPENDENCIES = {
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    FlexModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    DragDropModule,
    TitleComponent,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    AutoCompleteModule,
  ],
  providers: [ClasEqService, ModalPresenter],
};
