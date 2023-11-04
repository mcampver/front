// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';

import { DataGridModule } from 'src/app/shared/components/data-grid/data-grid.module';
import { TitleComponent } from '@shared/components/title/title.component';

import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    ListRoutingModule,
    MatTooltipModule,
    DataGridModule,
    MatCardModule,
    TitleComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  exports: [ListComponent],
})
export class ListModule {}
