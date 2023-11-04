// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandRoutingModule } from './brands-routing.module';
import { BrandService } from './brands.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, BrandRoutingModule],
  providers: [BrandService],
})
export class BrandModule {}
