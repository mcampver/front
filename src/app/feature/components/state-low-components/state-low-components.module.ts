// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateLowComponentsRoutingModule } from './state-low-components-routing.module';
import { StateLowComponentsService } from './state-low-components.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, StateLowComponentsRoutingModule],
  providers: [StateLowComponentsService],
})
export class StateLowComponentsModule {}
