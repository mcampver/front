// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechStatesRoutingModule } from './tech-states-routing.module';
import { TechStatesService } from './tech-states.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, TechStatesRoutingModule],
  providers: [TechStatesService],
})
export class TechStatesModule {}
