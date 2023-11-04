// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LowComponentsRoutingModule } from './low-components-routing.module';
import { LowComponentsService } from './low-components.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, LowComponentsRoutingModule],
  providers: [LowComponentsService],
})
export class LowComponentsModule {}
