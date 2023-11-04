import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { DialogBasicComponent } from './components/dialog-basic/dialog-basic.component';
import { DataGridModule } from '@shared/components/data-grid/data-grid.module';

@NgModule({
  declarations: [SnackBarComponent, DialogBasicComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    DataGridModule,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
