// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqGroupsService } from './eq-groups.service';
import { EqGroupsRoutingModule } from './eq-groups-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, EqGroupsRoutingModule],
  providers: [EqGroupsService],
})
export class EqGroupsModule {}
