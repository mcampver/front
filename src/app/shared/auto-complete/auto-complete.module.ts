import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteComponent } from './auto-complete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AutoCompleteComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [AutoCompleteComponent],
})
export class AutoCompleteModule {}
