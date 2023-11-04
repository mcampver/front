// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipTypesRoutingModule } from './equip-types-routing.module';
import { EquipTypesService } from './equip-types.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, EquipTypesRoutingModule],
  providers: [EquipTypesService],
})
export class EquipTypesModule {}
