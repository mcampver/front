// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestModelsRoutingModule } from './gest-models-routing.module';
import { GestModelsService } from './gest-models.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, GestModelsRoutingModule],
  providers: [GestModelsService],
})
export class GestModelsModule {}
