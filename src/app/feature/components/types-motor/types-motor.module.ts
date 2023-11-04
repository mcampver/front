// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypesMotorRoutingModule } from './types-motor-routing.module';
import { TypesMotorService } from './types-motor.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, TypesMotorRoutingModule],
  providers: [TypesMotorService],
})
export class TypesMotorModule {}
