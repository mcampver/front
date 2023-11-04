// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActSitService } from './act-sit.service';
import { ActSitRoutingModule } from './act-sit-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ActSitRoutingModule],
  providers: [ActSitService],
})
export class ActSitModule {}
