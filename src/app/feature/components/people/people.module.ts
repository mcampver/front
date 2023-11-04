// @Autor:Gianni Martinez
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleService } from './people.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, PeopleRoutingModule],
  providers: [PeopleService],
})
export class PeopleModule {}
