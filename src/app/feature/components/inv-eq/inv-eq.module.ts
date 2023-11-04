// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvEqService } from './inv-eq.service';
import { InvEqRoutingModule } from './inv-eq-routing.module';
import { TitleComponent } from '../../../shared/components/title/title.component';

@NgModule({
  declarations: [],
  providers: [InvEqService],
  imports: [CommonModule, InvEqRoutingModule, TitleComponent],
})
export class InvEqModule {}
