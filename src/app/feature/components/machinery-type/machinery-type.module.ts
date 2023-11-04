// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineryTypeRoutingModule } from './machinery-type-routing.module';
import { MachineryTypeService } from './machinery-type.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, MachineryTypeRoutingModule],
  providers: [MachineryTypeService],
})
export class MachineryTypeModule {}
