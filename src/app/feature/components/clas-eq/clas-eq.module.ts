// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasEqService } from './clas-eq.service';
import { ClasEqRoutingModule } from './clas-eq-routing.module';
import { CountryService } from './country.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, ClasEqRoutingModule],
  providers: [ClasEqService, CountryService],
})
export class ClasEqModule {}
